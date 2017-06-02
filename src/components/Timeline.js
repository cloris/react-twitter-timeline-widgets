import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import cloneDeep from 'lodash.clonedeep'
import AbstractWidget from './AbstractWidget'

export default class Timeline extends React.Component {
  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    options: PropTypes.object,
    template: PropTypes.object,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    onLoad: () => { },
  };

  shouldComponentUpdate(nextProps) {
    const changed = (name) => !isEqual(this.props[name], nextProps[name])
    return changed('dataSource') || changed('options') || changed('template')
  }

  ready = (tw, element, done) => {
    const { dataSource, options, template, onLoad } = this.props

    if (template.type == 'list') {
      // Options must be cloned since Twitter Widgets modifies it directly
      tw.widgets.createTimeline(dataSource, element, cloneDeep(options))
        .then(() => {
          // Widget is loaded
          done()
          onLoad()
        })
    }
    else {
      // Options must be cloned since Twitter Widgets modifies it directly
      tw.widgets.createGridFromCollection(dataSource.id, element, cloneDeep(options))
        .then(() => {
          // Widget is loaded
          done()
          onLoad()
        })
    }
  }

  render() {
    return React.createElement(AbstractWidget, { ready: this.ready })
  }
}
