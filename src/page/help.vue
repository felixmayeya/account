<template>
  <div class="">
    <h3>一、客户操作</h3>
    <h4>1.客户列表</h4>
    <img src="../img/p1.png" alt="" class="inImg">
    <h4>2.新建客户</h4>
    <img src="../img/p3.png" alt="" class="inImg">
    <img src="../img/p4.png" alt="" class="inImg">
    <h4>3.客户详情</h4>
    <img src="../img/p5.png" alt="" class="inImg">
    <h4>4.新建套餐</h4>
    <p>切换至套餐信息tab</p>
    <img src="../img/p6.png" alt="" class="inImg">
    <p>新建套餐窗口</p>
    <img src="../img/p7.png" alt="" class="inImg">
    <p>新建套餐中新建账号</p>
    <img src="../img/p8.png" alt="" class="inImg">
    <p>新建账号完成后在新建套餐中可选择该账号</p>
    <img src="../img/p9.png" alt="" class="inImg">
    <p>新套餐创建完成，并与新账号绑定</p>
    <img src="../img/p10.png" alt="" class="inImg">
    <h4>5.新建账号</h4>
    <p>新建账号时也可选择新建套餐，账号与套餐为多对多关系</p>
    <img src="../img/p11.png" alt="" class="inImg">
    <p>账号关闭后将无法登录</p>
    <h4>6.套餐变更历史</h4>
    <img src="../img/p12.png" alt="" class="inImg">
    <h4>7.新建签单</h4>
    <img src="../img/p13.png" alt="" class="inImg">
    <p>签单与套餐相关联，为一对一关系</p>
    <h4>8.信息编辑</h4>
    <p>客户信息、套餐信息、账号信息、签单信息中的部分内容可编辑</p>
    <br/>
    <h3>二、员工操作</h3>
    <h4>1.员工列表</h4>
    <img src="../img/p14.png" alt="" class="inImg">
    <h4>2.员工新建与编辑</h4>
    <img src="../img/p15.png" alt="" class="inImg">
    <img src="../img/p16.png" alt="" class="inImg">
    <h3>三、个人设置</h3>
    <p>员工可在个人设置中更改头像与密码，初始密码为666666。如需更改登录名或重置账号请联系管理员。</p>
    <h3>四、使用权限</h3>
    <p>此管理系统为开数内部使用，仅对部分员工开放，人事部门员工可使用员工操作部分，销售门部员工可使用客户操作部分。</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .inImg{
    width: 800px;
  }
  h3 {
    color: #475669;
  }
  h4{
    padding-left:10px;
    color: #475669;
  }
  p{
    color: #475669;
    padding-left:20px;
  }
</style>
