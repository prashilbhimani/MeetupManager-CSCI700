import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import { Navbar, InputGroup, Button, Form, FormControl } from 'react-bootstrap';
class TopBar extends Component {
    render() {
        return(
            <Navbar className="bg-dark justify-content-between">
            <Form inline>
                <FormControl type="text" placeholder="Enter Event Id" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
            </Form>
            </Navbar>
        );
    }
}

export default TopBar;