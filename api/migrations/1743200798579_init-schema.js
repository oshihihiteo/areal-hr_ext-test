exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('positions', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        }
    });
    pgm.createTable('organizations', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        },
        comment: {
            type: 'text',
            notNull: false
        }
    });
    pgm.createTable('departments', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        },
        organization_id: {
            type: 'int',
            notNull: true,
            references: '"organizations"(id)',
            onDelete: 'CASCADE'
        },
        parent_id: {
            type: 'int',
            notNull: false,
            references: '"departments"(id)',
            onDelete: 'SET NULL'

        },
        comment: {
            type: 'text',
            notNull: false
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('positions');
    pgm.dropTable('organizations');
    pgm.dropTable('departments');
};

