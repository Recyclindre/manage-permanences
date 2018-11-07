import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    listItem: {
        marginTop: theme.spacing.unit,
    },
})

const renderers = {
    /* eslint-disable-next-line react/prop-types */
    heading: ({ level, ...props }) => {
        let variant

        switch (level) {
            case 1:
                variant = 'display1'
                break
            case 2:
                variant = 'title'
                break
            case 3:
                variant = 'subheading'
                break
            default:
                variant = 'body1'
                break
        }

        return <Typography {...props} gutterBottom variant={variant} />
    },
    html: () => null,
    listItem: withStyles(styles)(({ classes, tight, ...props }) => (
        <li className={classes.listItem}>
            <Typography component="span" {...props} />
        </li>
    )),
    paragraph: props => <Typography {...props} paragraph />,
}

export default function Markdown(props) {
    return <ReactMarkdown renderers={renderers} {...props} />
}