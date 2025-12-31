import { initDatabase, closeDatabase } from './database'
import { v4 as uuidv4 } from 'uuid'

function insertTestData(): void {
  console.log('📝 Inserting test data into all tables...\n')

  try {
    const db = initDatabase()

    // Clear existing test data
    console.log('Cleaning up existing test data...')
    try {
      db.prepare('DELETE FROM links').run()
      db.prepare('DELETE FROM nodes').run()
      db.prepare('DELETE FROM board').run()
      db.prepare('DELETE FROM users WHERE user LIKE ?').run('test_%')
      console.log('✓ Existing test data cleared\n')
    } catch (error) {
      console.log('No existing test data to clear\n')
    }

    // ============================================
    // 1. Insert into USERS table
    // ============================================
    console.log('1️⃣  Inserting into USERS table...')
    const insertUser = db.prepare('INSERT INTO users (id, user) VALUES (?, ?)')

    const userId1 = uuidv4()
    const userId2 = uuidv4()
    const userId3 = uuidv4()

    insertUser.run(userId1, 'test_alice')
    insertUser.run(userId2, 'test_bob')
    insertUser.run(userId3, 'test_charlie')

    const userCount = db
      .prepare('SELECT COUNT(*) as count FROM users WHERE user LIKE ?')
      .get('test_%') as { count: number }
    console.log(`✓ Inserted ${userCount.count} users`)
    console.log(
      `  - User IDs: ${userId1.substring(0, 8)}..., ${userId2.substring(0, 8)}..., ${userId3.substring(0, 8)}...\n`
    )

    // ============================================
    // 2. Insert into BOARD table
    // ============================================
    console.log('2️⃣  Inserting into BOARD table...')
    const insertBoard = db.prepare(
      'INSERT INTO board (boardId, title, parentBoardId) VALUES (?, ?, ?)'
    )

    const rootBoardId = uuidv4()
    const projectBoardId = uuidv4()
    const personalBoardId = uuidv4()
    const taskBoardId = uuidv4()

    // Root board (no parent)
    insertBoard.run(rootBoardId, 'Root Board', null)

    // Child boards
    insertBoard.run(projectBoardId, 'Projects', rootBoardId)
    insertBoard.run(personalBoardId, 'Personal', rootBoardId)

    // Nested board (grandchild)
    insertBoard.run(taskBoardId, 'Tasks', projectBoardId)

    const boardCount = db.prepare('SELECT COUNT(*) as count FROM board').get() as { count: number }
    console.log(`✓ Inserted ${boardCount.count} boards`)
    console.log(
      `  - Board IDs: ${rootBoardId.substring(0, 8)}..., ${projectBoardId.substring(0, 8)}..., ${personalBoardId.substring(0, 8)}..., ${taskBoardId.substring(0, 8)}...\n`
    )

    // ============================================
    // 3. Insert into NODES table
    // ============================================
    console.log('3️⃣  Inserting into NODES table...')
    const insertNode = db.prepare(`
      INSERT INTO nodes (nodeId, type, title, filePath, userId) 
      VALUES (?, ?, ?, ?, ?)
    `)

    const nodeId1 = uuidv4()
    const nodeId2 = uuidv4()
    const nodeId3 = uuidv4()
    const nodeId4 = uuidv4()
    const nodeId5 = uuidv4()

    // Alice's nodes
    insertNode.run(nodeId1, 'file', 'Document 1', '/alice/docs/doc1.txt', userId1)
    insertNode.run(nodeId2, 'folder', 'Projects', '/alice/projects', userId1)
    insertNode.run(nodeId3, 'file', 'Notes', '/alice/notes.md', userId1)

    // Bob's nodes
    insertNode.run(nodeId4, 'file', 'Report', '/bob/report.pdf', userId2)

    // Charlie's nodes
    insertNode.run(nodeId5, 'folder', 'Archive', '/charlie/archive', userId3)

    const nodeCount = db.prepare('SELECT COUNT(*) as count FROM nodes').get() as { count: number }
    console.log(`✓ Inserted ${nodeCount.count} nodes`)
    console.log(
      `  - Node IDs: ${nodeId1.substring(0, 8)}..., ${nodeId2.substring(0, 8)}..., ${nodeId3.substring(0, 8)}..., ${nodeId4.substring(0, 8)}..., ${nodeId5.substring(0, 8)}...\n`
    )

    // ============================================
    // 4. Insert into LINKS table
    // ============================================
    console.log('4️⃣  Inserting into LINKS table...')
    const insertLink = db.prepare(`
      INSERT INTO links (first_node_id, second_node_id) 
      VALUES (?, ?)
    `)

    // Link node1 to node2 (Document 1 -> Projects)
    insertLink.run(nodeId1, nodeId2)

    // Link node2 to node3 (Projects -> Notes)
    insertLink.run(nodeId2, nodeId3)

    // Link node1 to node4 (Document 1 -> Report)
    insertLink.run(nodeId1, nodeId4)

    // Link node4 to node5 (Report -> Archive)
    insertLink.run(nodeId4, nodeId5)

    const linkCount = db.prepare('SELECT COUNT(*) as count FROM links').get() as { count: number }
    console.log(`✓ Inserted ${linkCount.count} links`)
    console.log(`  - Created relationships between nodes\n`)

    // ============================================
    // Summary: Verify all data
    // ============================================
    console.log('📊 Data Summary:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    const users = db
      .prepare('SELECT id, user FROM users WHERE user LIKE ?')
      .all('test_%') as Array<{ id: string; user: string }>
    console.log(`Users: ${users.length}`)
    users.forEach((u) => console.log(`  - ${u.user} (${u.id.substring(0, 8)}...)`))

    const boards = db.prepare('SELECT boardId, title, parentBoardId FROM board').all() as Array<{
      boardId: string
      title: string
      parentBoardId: string | null
    }>
    console.log(`\nBoards: ${boards.length}`)
    boards.forEach((b) =>
      console.log(
        `  - ${b.title} (${b.boardId.substring(0, 8)}...) - Parent: ${b.parentBoardId ? b.parentBoardId.substring(0, 8) + '...' : 'None'}`
      )
    )

    const nodes = db.prepare('SELECT nodeId, type, title, userId FROM nodes').all() as Array<{
      nodeId: string
      type: string
      title: string
      userId: string
    }>
    console.log(`\nNodes: ${nodes.length}`)
    nodes.forEach((n) => {
      const user = users.find((u) => u.id === n.userId)
      console.log(
        `  - ${n.title} (${n.type}) - User: ${user?.user || 'Unknown'} (${n.nodeId.substring(0, 8)}...)`
      )
    })

    const links = db.prepare('SELECT first_node_id, second_node_id FROM links').all() as Array<{
      first_node_id: string
      second_node_id: string
    }>
    console.log(`\nLinks: ${links.length}`)
    links.forEach((l) => {
      const node1 = nodes.find((n) => n.nodeId === l.first_node_id)
      const node2 = nodes.find((n) => n.nodeId === l.second_node_id)
      console.log(`  - ${node1?.title || 'Unknown'} <-> ${node2?.title || 'Unknown'}`)
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n✅ Successfully inserted data into all tables!')
    console.log(`\nDatabase location: ${db.name || 'app.db'}`)
    console.log('💡 Database is kept for inspection. Run cleanup manually if needed.\n')
  } catch (error) {
    console.error('\n❌ Failed to insert test data:', error)
    throw error
  }
}

// Run the insert tests
insertTestData()
