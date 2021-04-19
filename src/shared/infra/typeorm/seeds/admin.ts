import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();

  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, type, active, created_at)
      values('${id}', 'Administrador', 'admin@typext.com.br', '${password}', 'Admin', true, 'now()')
    `,
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
