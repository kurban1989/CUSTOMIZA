// const db = require('../mysql_models')
// const UserModel = require('../models/User');
//
// module.exports = {
//   online: UserModel,
//   async getUser(agent_id) {
//     let result = await mssql.query("exec chat.dbo.getUser @agent_id=" + agent_id);
//     let userData = result.recordset;
//     if(!(userData instanceof Array) || userData.length === 0) return new Error();
//     return new UserModel(userData[0]);
//   },
//   async getSkillGroups(agent_id) {
//     let result = await mssql.query("exec chat.dbo.getSkillGroupUser @agent_id=" + agent_id);
//     return (result.recordset instanceof Array) ? result.recordset : [];
//   },
//   async getRolesBySkill(skill_id) {
//     let result = await mssql.query("exec chat.dbo.getRolesBySkill @skill_id=" + skill_id);
//     return (result.recordset instanceof Array) ? result.recordset : [];
//   },
//   async getUsersBySkill(skill_id) {
//     let result = await mssql.query("exec chat.dbo.getUsersBySkill @skill_id=" + skill_id);
//     return (result.recordset instanceof Array) ? result.recordset : [];
//   }
// };
