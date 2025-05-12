exports.up = async (pgm) => {
    await pgm.sql('BEGIN;');

    try {
        await pgm.sql(`
            INSERT INTO organizations (name, comment)
            VALUES ('ООО "Ромашка"', 'Комментарий к организации'),
                   ('ЗАО "Прогресс"', NULL);
        `);

        await pgm.sql(`
            INSERT INTO positions (name)
            VALUES ('Менеджер'),
                   ('Стажер'),
                   ('Бухгалтер');
        `);

        await pgm.sql(`
            INSERT INTO departments (name, organization_id, parent_id, comment)
            VALUES ('Отдел продаж', 1, NULL, NULL),
                   ('ИТ-отдел', 1, NULL, 'Главный ИТ-отдел'),
                   ('Бухгалтерия', 2, NULL, NULL);
        `);

        await pgm.sql(`
            INSERT INTO passport_data (series, number, issued_date, unit_code, issued_by)
            VALUES ('1234', '567890', '2010-01-01', '123-456', 'ОВД города N'),
                   ('4321', '098765', '2015-06-15', '654-321', 'УФМС района K');
        `);

        await pgm.sql(`
            INSERT INTO addresses (region, settlement, street, house, building, apartment)
            VALUES ('Московская область', 'Москва', 'Ленина', '10', NULL, 45),
                   ('Ленинградская область', 'Санкт-Петербург', 'Невский проспект', '20', 'Б', NULL);
        `);

        await pgm.sql(`
            INSERT INTO employees (lastname, firstname, patronymic, birth_date, passport_data_id, address_id)
            VALUES ('Иванов', 'Иван', 'Иванович', '1990-05-01', 1, 1),
                   ('Петрова', 'Анна', NULL, '1985-03-12', 2, 2);
        `);

        await pgm.sql(`
            INSERT INTO files (employee_id, name, file)
            VALUES (1, 'Фото', 'ivanov_photo.jpg'),
                   (2, 'Резюме', 'petrova_resume.pdf');
        `);

        await pgm.sql(`
            INSERT INTO hr_operations (employee_id, action_id, salary, position_id, department_id, created_at)
            VALUES 
              (1, 1, 50000, 1, 1, NOW()),
              (2, 1, 60000, 2, 2, NOW());
        `);

        await pgm.sql(`
            INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
            VALUES 
              (2, 'Петров', 'Петр', NULL, 'login1(password1)', 'hashedpassword'), 
              (2, 'Менеджерова', 'Мария', 'Игоревна', 'login2(password2)', 'hashedpassword');
        `);

        await pgm.sql(`
            INSERT INTO changelog (date_and_time, user_id, object_type_id, object_id, changed_fields, created_at, updated_at, deleted_at)
            VALUES 
              (NOW(), 1, 4, 1, '{"salary": [null, 50000]}', NOW(), NOW(), NULL),
              (NOW(), 2, 4, 2, '{"department_id": [1, 2]}', NOW(), NOW(), NULL);
        `);

        await pgm.sql('COMMIT;');
    } catch (e) {
        await pgm.sql('ROLLBACK;');
        throw e;      }
};

exports.down = async (pgm) => {
    await pgm.sql('BEGIN;');

    try {
        await pgm.sql(`DELETE FROM changelog`);
        await pgm.sql(`DELETE FROM users`);
        await pgm.sql(`DELETE FROM hr_operations`);
        await pgm.sql(`DELETE FROM files`);
        await pgm.sql(`DELETE FROM employees`);
        await pgm.sql(`DELETE FROM addresses`);
        await pgm.sql(`DELETE FROM passport_data`);
        await pgm.sql(`DELETE FROM departments`);
        await pgm.sql(`DELETE FROM positions`);
        await pgm.sql(`DELETE FROM organizations`);

        await pgm.sql('COMMIT;');
    } catch (e) {
        await pgm.sql('ROLLBACK;');
        throw e;
    }
};
