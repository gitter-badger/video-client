import React = require('react')
import { List, ListItem, Divider, Drawer, Paper, FlatButton } from 'material-ui'
import { NavigationFullscreen, ImagePhotoCamera, NavigationFullscreenExit, ImageBrightness2, NotificationSync, 
    NavigationChevronLeft, NavigationChevronRight } from 'material-ui/svg-icons';
const {Box, VBox, Page, Container} = require('react-layout-components')
import {VideoCollection} from '../Model/resource'

export interface ShowBoxProps {
    videos: VideoCollection
}


export class ShowBox extends React.Component<ShowBoxProps, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return <a className='show-box'>
            <img src={this.props.videos.poster} alt={this.props.videos.name}/>
            <h4>{this.props.videos.name}</h4>
        </a>
    }
}