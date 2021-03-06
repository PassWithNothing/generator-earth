//import base&&tool
import 'whatwg-fetch'
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

// bundleLoader 异步加载路由页面
import BundleLoader from 'lm-bundle-loader'

import Home from "./containers/Home"
import Site from './containers/Site'

// scrollToTop 路由切换时候页面默认滚动到顶部，可在此控件中配置白名单
import ScrollToTop from 'commons/ScrollToTop'


// import containers
import App from './containers/App'

// 异步加载文件 参考文档 https://webpack.js.org/guides/code-splitting/#dynamic-imports
// 参数中的注释部分不建议删除，原因请看上述文档
const My = () => import( './containers/My' /* webpackChunkName:"My" */ );

//主页面路由
class MainRouter extends React.PureComponent {
    render() {
        return (
            <ScrollToTop>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/site' component={Site}/>
                    <Route path='/my'
                           render={
                               (props) => BundleLoader(My, props)
                           }/>

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}
MainRouter = withRouter(MainRouter);

const rootElement = document.getElementById('root');

ReactDOM.render(

    <Router>
        <div>
            <App/>
            <MainRouter/>
        </div>
    </Router>,

    rootElement

);
