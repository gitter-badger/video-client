import React = require('react')
import {Tabs, Tab, AppBar} from 'material-ui'
import {Categories, Discovery} from '.'
const {Box, VBox, Page, Container} = require('react-layout-components')
import SwipeableViews from 'react-swipeable-views'

export class HomePage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        let tabname = props.params.tab
        if (tabname == null) tabname = 'categories'
        this.state = { slideIndex: this.map_value(tabname), slideName: tabname }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.tab != this.state.slideName) {
            let tabname = nextProps.params.tab
            this.setState({ slideIndex: this.map_value(tabname), slideName: tabname })
        }
    }

    map_value(name: string) {
        for (var i of HomePage.tabs)
            if (name == i.props['data-route'])
                return i.props['value']
        return 0
    }
    handleChange(value, e, tab) {
        this.setState({slideIndex: value, slideName: tab.props['data-route']})
        this.props.router.push("/home/"+tab.props['data-route'])
    }

    static tabs = [
        <Tab key={0} label="分类" data-route="categories" value={0}></Tab>,
        <Tab key={1} label="发现" data-route="discovery" value={1}></Tab>,
        <Tab key={2} label="电影" data-route="movie" value={2}></Tab>,
        <Tab key={3} label="电视剧" data-route="series" value={3}></Tab>,
        <Tab key={4} label="动漫" data-route="animate" value={4}></Tab>,
        <Tab key={5} label="电视" data-route="tv" value={5}></Tab>,
        <Tab key={6} label="直播" data-route="online" value={6}></Tab>
    ]

    render() {
        return <Container><VBox>
            <Box flex='none'>
                <Tabs ref='tabs' style={{width: '100%'}} onChange={this.handleChange} value={this.state.slideIndex}>
                    {HomePage.tabs}
                </Tabs>
            </Box>
            <Box flex='1' style={{height: '100%'}}>
                <SwipeableViews style={{height: '100%'}} index={this.state.slideIndex} onChangeIndex={this.handleChange}>  
                    <Categories/>
                    <Discovery/>
                    <Discovery/>
                    <Discovery/>
                    <Discovery/>
                    <Discovery/>
                    <Discovery/>
                </SwipeableViews>
            </Box>
        </VBox></Container>
    }
}