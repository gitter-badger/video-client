import * as React from 'react'
import {LeftMenu} from './left-menu'
import {User} from './user'
import {AppBar, Drawer, MenuItem, TextField, IconButton} from 'material-ui'
import {ActionSearch, NavigationArrowBack, NavigationMenu} from 'material-ui/svg-icons'
import {App} from '../Model/app'
const {Box, VBox, Page, Container} = require("react-layout-components")

export class Framework extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {open: false,  hidebar: false, 
            icon: props.routes[1].path == 'home'? this.menu_icon : this.arrow_icon};
        App.framework = this
    }
    onMenuBtnClick() {
        if (this.state.icon == this.arrow_icon)
            this.props.router.goBack()
        else
            this.setState({open: true})
    }
    onMenuBackClick() {
        this.setState({open: !this.state.open})
    }
    onSearch(event) {
        if (event.keyCode == 13) {
            let video_name = event.target.value
            this.props.router.push('/search/'+video_name)
        }
    }
    onSearchBarFocus(event) {
        event.target.value = ''
    }
    setHidebar(arg: boolean) {
        this.setState({hidebar: arg})
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.icon === this.menu_icon && nextProps.routes.length>1 && nextProps.routes[1].path != 'home')
            this.setState({icon: this.arrow_icon})
        if (this.state.icon === this.arrow_icon && nextProps.routes.length>1 && nextProps.routes[1].path == 'home')
            this.setState({icon: this.menu_icon})
    }

    arrow_icon= <IconButton><NavigationArrowBack /></IconButton>
    menu_icon= <IconButton><NavigationMenu /></IconButton>
    static hide_appbar = {height: 0};
    static drawer_width = 300;

    private search_box = <Box alignItems='center'>
        <ActionSearch color='#fff'/>
        <TextField  onKeyDown={this.onSearch.bind(this)} 
                    onFocus={ this.onSearchBarFocus }
                    hintText='Search...'/>
    </Box>

    render() {
        return <Page>
            <Drawer open={this.state.open} width={Framework.drawer_width} containerStyle={{overflow:'visible'}}>
                <User/>
                <LeftMenu open={this.state.open} width={Framework.drawer_width} onBack={this.onMenuBackClick.bind(this)}/>
            </Drawer>
            <Container fit>
                <VBox fit>
                    <Box flex='none' style={this.state.hidebar ? Framework.hide_appbar : null}>
                        <AppBar title='主页' iconElementLeft={this.state.icon} onLeftIconButtonTouchTap={this.onMenuBtnClick.bind(this)} iconElementRight={this.search_box} />
                    </Box>
                    <Box flex='1' style={{height: '100%'}}>
                        {this.props.children}
                    </Box>
                </VBox>
            </Container>
        </Page>
    }
}