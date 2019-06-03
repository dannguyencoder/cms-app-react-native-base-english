import areaData from './citys';
export const areas = areaData.provinces;
export const API = 'http://yushijie.club:8080/cloudcommodity/user/v1';
export const IMAGE_URL = 'http://yushijie.club/cloudimg/goods/';
// export const API = 'http://192.168.191.1:8080/user/v1';
export const USER_ID = 'userId';
export const TOKEN = 'token';
export const PRIMARY_COLOR = '#3f51b5';
export const RED_COLOR = '#f56c6c';
export const RED_COLOR_ACTIVE = '#ff5a5f';
export const BORDER_COLOR = '#efeff4';
export const RE_USERNAME = /^[a-zA-Z]\w{6,25}$/
export const RE_PHONE = /^1\d{10}$/;
export const SERVICE_CONTENT = `Developer cellphone： 13075970590
Developer email： gre_yu@163.com`;
export const SUGGEST_CONTENT = `请把意见发送到邮箱：gre_yu@163.com`;
export const GITHUB_CONTENT = `github: https://github.com/greyu`;


/**
  * Order pending status
  */
export const ORDER_WAIT = 0;

/**
  * Status in order delivery
  */
export const ORDER_DISPATCHING = 1;

/**
  * Order confirmation delivery status
  */
export const ORDER_FINISH = 2;

/**
  * Order refund status
  */
export const ORDER_REFUNDING = 3;

/**
  * Order refund completed
  */
export const ORDER_REFUND_SUCCESS = -1;

/**
  * Order refund failed
  */
export const ORDER_REFUNDING_FAILURE = -2;
