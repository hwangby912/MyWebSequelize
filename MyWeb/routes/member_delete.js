var express = require('express');
var router = express.Router();
const {Member2} = require('../models');

/* post member_insert */
router.post('/', function(req, res, next) {
 const result={msg:''};
  Member2.destroy({   
   where:{id: req.body.user_id  }
 })
 .then((rs)=>{
   console.log(rs);
   result.msg=`${req.body.user_id}님 탈퇴되셨습니다`;
   res.json(JSON.stringify(result));
 })
 .catch((err)=>{
   console.error(err);
   result.msg=`탈퇴오류`;
   res.json(JSON.stringify(result));
 });
  
});
module.exports = router;


