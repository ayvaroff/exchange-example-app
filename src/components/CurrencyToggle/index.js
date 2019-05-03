import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const PocketToggle = ({
  onClick,
  pockets,
  selected,
}) => (
  <div className="pocket-toggle">
    {Object.keys(pockets).map(key => (
      <button
        key={key}
        className={cn('pocket-toggle-btn', { selected: key === selected })}
        onClick={() => onClick(key)}
        type="button"
      >
        {key}
      </button>
    ))}
  </div>
)

PocketToggle.propTypes = {
  onClick: PropTypes.func,
  pockets: PropTypes.object,
  selected: PropTypes.string,
}

export default PocketToggle
