/* 父元素-横向排列(主轴) */
export const flexH = {
  // display: 'box' /* OLD - Android 4.4- */,
  // display: '-webkit-box' /* OLD - iOS 6-, Safari 3.1-6 */,
  // display: '-moz-box' /* OLD - Firefox 19- (buggy but mostly works) */,
  // display: '-ms-flexbox' /* TWEENER - IE 10 */,
  // display: '-webkit-flex' /* NEW - Chrome */,
  display: 'flex' /* NEW, Spec - Opera 12.1, Firefox 20+ */,
  /* 09版 */
  WebkitBoxOrient: 'horizontal',
  /* 12版 */
  WebkitFlexDirection: 'row',
  MozFlexDirection: 'row',
  msFlexDirection: 'row',
  OFlexDirection: 'row',
  flexDirection: 'row',
};

/* 父元素-横向换行 */
export const flexHW = {
  /* 09版 */
  WebkitBoxLines: 'multiple',
  /* 12版 */
  WebkitFlexWrap: 'wrap',
  MozFlexWrap: 'wrap',
  msFlexWrap: 'wrap',
  OFlexWrap: 'wrap',
  flexWrap: 'wrap',
};

/* 父元素-水平居中(主轴是横向才生效) */
export const flexHC = {
  /* 09版 */
  WebkitBoxPack: 'center',
  /* 12版 */
  WebkitJustifyContent: 'center',
  MozJustifyContent: 'center',
  msJustifyContent: 'center',
  OJustifyContent: 'center',
  justifyContent: 'center',
  /* 其它取值如下：
	flex-start
	align-items     主轴原点方向对齐
	flex-end        主轴延伸方向对齐
	space-between   等间距排列，首尾不留白
	space-around    等间距排列，首尾留白
	*/
};

/* 父元素-左对齐(主轴是横向才生效) */
export const flexHFS = {
  /* 09版 */
  WebkitBoxPack: 'flex-start',
  /* 12版 */
  WebkitJustifyContent: 'flex-start',
  MozJustifyContent: 'flex-start',
  msJustifyContent: 'flex-start',
  OJustifyContent: 'flex-start',
  justifyContent: 'flex-start',
};

/* 父元素-右对齐(主轴是横向才生效) */
export const flexHFE = {
  /* 09版 */
  WebkitBoxPack: 'flex-end',
  /* 12版 */
  ebkitJustifyContent: 'flex-end',
  MozJustifyContent: 'flex-end',
  msJustifyContent: 'flex-end',
  OJustifyContent: 'flex-end',
  justifyContent: 'flex-end',
};

/* 父元素-等间距排列，首尾不留白(主轴是横向才生效) */
export const flexHSB = {
  /* 09版 */
  WebkitBoxPack: 'space-between',
  /* 12版 */
  WebkitJustifyContent: 'space-between',
  MozJustifyContent: 'space-between',
  msJustifyContent: 'space-between',
  OJustifyContent: 'space-between',
  justifyContent: 'space-between',
};

/* 父元素-等间距排列，首尾留白(主轴是横向才生效) */
export const flexHSA = {
  /* 09版 */
  ebkitBoxPack: 'space-around',
  /* 12版 */
  WebkitJustifyContent: 'space-around',
  MozJustifyContent: 'space-around',
  msJustifyContent: 'space-around',
  OJustifyContent: 'space-around',
  justifyContent: 'space-around',
};

/* 父元素-纵向排列(主轴) */
export const flexV = {
  // display: 'box' /* OLD - Android 4.4- */,
  // display: '-webkit-box' /* OLD - iOS 6-, Safari 3.1-6 */,
  // display: '-moz-box' /* OLD - Firefox 19- (buggy but mostly works) */,
  // display: '-ms-flexbox' /* TWEENER - IE 10 */,
  // display: '-webkit-flex' /* NEW - Chrome */,
  display: 'flex' /* NEW, Spec - Opera 12.1, Firefox 20+ */,
  /* 09版 */
  WebkitBoxOrient: 'vertical',
  /* 12版 */
  WebkitFlexDirection: 'column',
  MozFlexDirection: 'column',
  msFlexDirection: 'column',
  OFlexDirection: 'column',
  flexDirection: 'column',
};

/* 父元素-纵向换行 */
export const flexVW = {
  /* 09版 */
  WebkitBoxLines: 'multiple',
  /* 12版 */
  WebkitFlexWrap: 'wrap',
  MozFlexWrap: 'wrap',
  msFlexWrap: 'wrap',
  OFlexWrap: 'wrap',
  flexWrap: 'wrap',
};

/* 父元素-竖直居中(主轴是横向才生效) */
export const flexVC = {
  /* 09版 */
  WebkitBoxAlign: 'center',
  /* 12版 */
  WebkitAlignItems: 'center',
  MozAlignItems: 'center',
  msAlignItems: 'center',
  OAlignItems: 'center',
  alignItems: 'center',
};

/* 父元素-以起点对齐(主轴是竖向才生效) */
export const flexVFS = {
  /* 09版 */
  WebkitBoxAlign: 'flex-start',
  /* 12版 */
  WebkitAlignItems: 'flex-start',
  MozAlignItems: 'flex-start',
  msAlignItems: 'flex-start',
  OAlignItems: 'flex-start',
  alignItems: 'flex-start',
};

/* 父元素-以终点对齐(主轴是竖向才生效) */
export const flexVFE = {
  /* 09版 */
  WebkitBoxAlign: 'flex-end',
  /* 12版 */
  WebkitAlignItems: 'flex-end',
  MozAlignItems: 'flex-end',
  msAlignItems: 'flex-end',
  OAlignItems: 'flex-end',
  alignItems: 'flex-end',
};

/* 父元素-项目的第一行文字的基线对齐(主轴是竖向才生效) */
export const flexVBL = {
  /* 09版 */
  WebkitBoxAlign: 'baseline',
  /* 12版 */
  WebkitAlignItems: 'baseline',
  MozAlignItems: 'baseline',
  msAlignItems: 'baseline',
  OAlignItems: 'baseline',
  alignItems: 'baseline',
};

/* 父元素(缺省)-未设置 height 或为 auto(主轴是竖向才生效) */
export const flexVSTR = {
  /* 09版 */
  WebkitBoxAlign: 'stretch',
  /* 12版 */
  WebkitAlignItems: 'stretch',
  MozAlignItems: 'stretch',
  msAlignItems: 'stretch',
  OAlignItems: 'stretch',
  alignItems: 'stretch',
};

const Flex = {
  flexH,
  flexHW,
  flexHC,
  flexHFS,
  flexHFE,
  flexHSB,
  flexHSA,

  flexV,
  flexVW,
  flexVC,
  flexVFS,
  flexVFE,
  flexVBL,
  flexVSTR,
};
export default Flex;
