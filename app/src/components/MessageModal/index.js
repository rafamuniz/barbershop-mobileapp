import React, { Component } from 'react';
import {
    Modal
} from 'react-native';

export default class MessageModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => console.log("Modal has been closed.")}
            >
            </Modal>
        );
    }
}