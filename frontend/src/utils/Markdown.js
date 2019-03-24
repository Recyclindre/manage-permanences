import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing.unit
  }
})

const renderers = {
  /* eslint-disable-next-line react/prop-types */
  heading: ({ level, ...props }) => {
    let variant
    let component

    switch (level) {
      case 1:
        component = 'h1'
        variant = 'h4'
        break
      case 2:
        component = 'h2'
        variant = 'h6'
        break
      case 3:
        component = 'h3'
        variant = 'h3'
        break
      default:
        component = 'p'
        variant = 'body2'
        break
    }

    return (
      <Typography
        {...props}
        gutterBottom
        variant={variant}
        component={component}
      />
    )
  },
  html: () => null,
  listItem: withStyles(styles)(({ classes, tight, ...props }) => (
    <li className={classes.listItem}>
      <Typography component="span" {...props} />
    </li>
  )),
  paragraph: props => <Typography {...props} paragraph />
}

export default function Markdown(props) {
  return <ReactMarkdown renderers={renderers} {...props} />
}
