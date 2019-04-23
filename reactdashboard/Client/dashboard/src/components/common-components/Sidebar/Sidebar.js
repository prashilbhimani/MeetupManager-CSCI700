import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import sidebarRoutes from "../../../routes/sidebar_routes";
import { styles } from "./styles";
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    const { classes, ...other } = this.props;

    return (
      <SwipeableDrawer {...other}>
        <List disablePadding>
          <ListItem
            className={classNames(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            Meetup Manager
          </ListItem>
          {sidebarRoutes.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active, targetUrl }) => (
                <ListItem
                  button
                  dense
                  key={childId}
                  component={NavLink}
                  to={targetUrl}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                  )}
                  onClick={()=>other.onClose()}
                  activeClassName={classes.itemActiveItem}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
        <List disablePadding>
        </List>


      </SwipeableDrawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
