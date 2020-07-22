import routeDev from '../../router/routeDev'
/**
 * 动态添加菜单
 * author:qlx
 */
const addMenus = {
  state: {
    menuList: []
  },
  getters:{
    getMenuList:state=>{
      if(routeDev.MENU_DEV==true){
        return state.menuList.concat(routeDev.menuDevList);
      }
      else{
        return state.menuList;
      }

  }
  },
  mutations: {

  },
  actions: {

  }
}
export default addMenus
