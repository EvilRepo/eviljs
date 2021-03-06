import {classes} from '@eviljs/react/react.js'
import {cloneElement, isValidElement} from 'react'

import './v1.css'

export function Checkbox(props: CheckboxProps) {
    const {className, children, checked, disabled, onChange, ...otherProps} = props
    const enabled = ! disabled

    return (
        <button
            tabIndex={0}
            {...otherProps}
            className={classes('Checkbox-16ba std-button', className)}
            role="checkbox"
            aria-checked={
                checked === 'mixed'
                    ? 'mixed'
                : checked
                    ? 'true'
                : 'false'
            }
            disabled={disabled}
            onClick={enabled
                ? (event) => onChange?.(checked === 'mixed' ? true : ! checked)
                : undefined
            }
        >
            {isValidElement(children) && cloneElement(children, {checked})}
        </button>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>, CheckboxModel {
    onChange?(value: boolean): void
}

export interface CheckboxModel {
    checked?: null | boolean | 'mixed'
}
