exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('passport_data', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        series: {
            type: 'varchar(4)',
            notNull: true,
        },
        number: {
            type: 'varchar(6)',
            notNull: true,
        },
        issued_date: {
            type: 'timestamp',
            notNull: true
        },
        unit_code: {
            type: 'varchar(7)',
            notNull: true
        },
        issued_by: {
            type: 'varchar(255)',
            notNull: true
        }
    });
    pgm.createTable('addresses', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        region: {
            type: 'varchar(255)',
            notNull: true
        },
        settlement: {
            type: 'varchar(255)',
            notNull: true
        },
        street: {
            type: 'varchar(255)',
            notNull: true
        },
        house: {
            type: 'varchar(255)',
            notNull: true
        },
        building: {
            type: 'varchar(255)',
            notNull: false
        },
        apartment: {
            type: 'int',
            notNull: false
        }
    });
    pgm.createTable('employees', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        lastname: {
            type: 'varchar(255)',
            notNull: true
        },
        firstname: {
            type: 'varchar(255)',
            notNull: true
        },
        patronymic: {
            type: 'varchar(255)',
            notNull: false
        },
        birth_date: {
            type: 'timestamp',
            notNull: true,
        },
        passport_data_id: {
            type: 'int',
            notNull: true,
            references: '"passport_data"(id)',
            onDelete: 'CASCADE'
        },
        address_id: {
            type: 'int',
            notNull: true,
            references: '"addresses"(id)',
            onDelete: 'CASCADE'
        }
    });
    pgm.createTable('files', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        employee_id: {
            type: 'int',
            notNull: false,
            references: '"employees"(id)',
            onDelete: 'SET NULL'
        },
        name: {
            type: 'varchar(255)',
            notNull: true
        },
        file: {
            type: 'varchar(255)',
            notNull: true
        }
    });
    pgm.createTable('actions', {
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
    pgm.sql(`
        INSERT INTO actions (name) VALUES 
        ('Принят(а) на должность'),
        ('Переведён(а) в другой отдел'),
        ('Уволен(а)'),
        ('Изменена заработная плата')
    `);
    pgm.createTable('hr_operations', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        employee_id: {
            type: 'int',
            notNull: true,
            references: '"employees"(id)',
            onDelete: 'CASCADE'
        },
        action_id: {
            type: 'int',
            notNull: true,
            references: '"actions"(id)',
            onDelete: 'CASCADE'
        },
        salary: {
            type: 'int',
            notNull: true
        },
        position_id: {
            type: 'int',
            notNull: true,
            references: '"positions"(id)',
            onDelete: 'CASCADE'
        },
        department_id: {
            type: 'int',
            notNull: true,
            references: '"departments"(id)',
            onDelete: 'CASCADE'
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
        }
    });
    pgm.createTable('roles', {
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
    pgm.createTable('users', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        role_id: {
            type: 'int',
            notNull: true,
            references: '"roles"(id)',
            onDelete: 'CASCADE'
        },
        lastname: {
            type: 'varchar(255)',
            notNull: true
        },
        firstname: {
            type: 'varchar(255)',
            notNull: true
        },
        patronymic: {
            type: 'varchar(255)',
            notNull: false
        },
        login: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'varchar(255)',
            notNull: true
        },
    });
    pgm.createTable('object_types', {
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
    pgm.sql(`
        INSERT INTO object_types (name) VALUES 
        ('Должность'),
        ('Отдел'),
        ('Организация'),
        ('Сотрудник'),
        ('Кадровая операция'),
        ('Файл')
    `);
    pgm.createTable('changelog', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        date_and_time: {
            type: 'timestamp',
            notNull: true
        },
        user_id: {
            type: 'int',
            notNull: false,
            references: '"users"(id)',
            onDelete: 'SET NULL'
        },
        object_type_id: {
            type: 'int',
            notNull: false,
            references: '"object_types"(id)',
            onDelete: 'SET NULL'
        },
        object_id: {
            type: 'int',
            notNull: true
        },
        changed_fields: {
            type: 'json',
            notNull: false
        },
        created_at: {
            type: 'timestamp',
            notNull: false
        },
        updated_at: {
            type: 'timestamp',
            notNull: false
        },
        deleted_at: {
            type: 'timestamp',
            notNull: false
        }
    });

};

exports.down = (pgm) => {
    pgm.dropTable('changelog', { cascade: true });
    pgm.dropTable('object_types', { cascade: true });
    pgm.dropTable('users', { cascade: true });
    pgm.dropTable('roles', { cascade: true });
    pgm.dropTable('hr_operations', { cascade: true });
    pgm.dropTable('actions', { cascade: true });
    pgm.dropTable('files', { cascade: true });
    pgm.dropTable('employees', { cascade: true });
    pgm.dropTable('addresses', { cascade: true });
    pgm.dropTable('passport_data', { cascade: true });
};

