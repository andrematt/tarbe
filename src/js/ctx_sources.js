
let triggers_url = "http://127.0.0.1:20000/triggers";
let actions_url = "http://127.0.0.1:20000/actions";
//let db_access_url = "http://localhost:8000/pat-sqlite-server/db_access.php";


//let triggers_url = "https://giove.isti.cnr.it/demo/pat/pat-node-server/triggers.json";
//let actions_url = "https://giove.isti.cnr.it/demo/pat/pat-node-server/actions.json";
let db_access_url ="https://giove.isti.cnr.it/demo/pat/pat-sqlite-server/db_access.php";


const GLOBALS  = {
  triggers : triggers_url,
  actions : actions_url,
  db_access_url: db_access_url,
  appname: "tab"
};

export default GLOBALS;
