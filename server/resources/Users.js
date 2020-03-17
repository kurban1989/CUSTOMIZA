const db = require('../mysql_models')
// const responseFields = ['id', 'email', 'firstName', 'lastName', 'phone', 'roleId', 'roleName', 'statusId', 'statusName', 'created_at', 'updated_at']

module.exports = {
  async getUsers (field, query, pattern = '=') {
    query = pattern === 'like' ? '%' + query + '%' : query
    const where = field && query ? `WHERE u.${field} ${pattern} '${query}'` : ''
    const sql = `SELECT u.*, ur.name as roleName, us.name as statusName FROM users as u 
                    LEFT JOIN user_roles as ur ON ur.id = u.roleId
                    LEFT JOIN user_statuses as us ON us.id = u.statusId
                    ${where}`
    // eslint-disable-next-line no-return-await
    return await db.getQuery(sql)
  },
  async getRoles (id) {
    const where = id ? `WHERE id = ${id}` : ''
    const sql = `SELECT * FROM user_roles ${where}`
    // eslint-disable-next-line no-return-await
    return await db.getQuery(sql)
  },
  async getStatuses (id) {
    const where = id ? `WHERE id = ${id}` : ''
    const sql = `SELECT * FROM user_statuses ${where}`
    // eslint-disable-next-line no-return-await
    return await db.getQuery(sql)
  }
}
