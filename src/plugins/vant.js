import Vue from 'vue'
import {
  Button,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Sticky,
  Cell,
  CellGroup,
  Skeleton,
  PullRefresh,
  Toast,
  Popup,
  Badge,
  Slider,
  Icon,
  Tag,
  Collapse,
  CollapseItem,
  Pagination,
  List,
  Loading,
  Image,
  Empty,
  ShareSheet,
  Form,
  Field,
  Checkbox,
  CheckboxGroup,
  NoticeBar
} from 'vant'

// 放入数组
const plugins = [
  Button,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Sticky,
  Cell,
  CellGroup,
  Skeleton,
  PullRefresh,
  Toast,
  Popup,
  Badge,
  Slider,
  Icon,
  Tag,
  Collapse,
  CollapseItem,
  Pagination,
  List,
  Loading,
  Image,
  Empty,
  ShareSheet,
  Form,
  Field,
  Checkbox,
  CheckboxGroup,
  NoticeBar
]
plugins.forEach(item => {
  return Vue.use(item)
})
