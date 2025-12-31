create table if not exists users (
    id text PRIMARY KEY NOT NULL,
    user text not null UNIQUE,
    createAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updateAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if NOT EXISTS board (
    boardId text PRIMARY KEY NOT NULL,
    title text not null,
    parentBoardId text,
    createAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updateAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parentBoardId) REFERENCES board(boardId) ON DELETE CASCADE
);

create table if not exists nodes (
    nodeId text PRIMARY KEY NOT NULL,
    type Text not null,
    title text not null,
    filePath text not null,
    userId text not null,
    createAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updateAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE table if not EXISTS links (
    first_node_id text not null,
    second_node_id text NOT NULL,
    createAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updateAt TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (first_node_id, second_node_id), 
    FOREIGN KEY (first_node_id) REFERENCES nodes(nodeId) ON DELETE CASCADE,
    FOREIGN KEY (second_node_id) REFERENCES nodes(nodeId) ON DELETE CASCADE
);