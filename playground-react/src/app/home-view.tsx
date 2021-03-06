import {classes} from '@eviljs/react/react'
import {useUndoRedo} from '@eviljs/react/undoredo'
import {Button} from '@eviljs/reactx/button/v1'
import {Input} from '@eviljs/reactx/input/v1'
import {useI18nMsg} from 'lib/hooks'
import {Header} from 'lib/widgets/header'

import './home-view.css'

export function HomeView(props: HomeViewProps) {
    const {className, ...otherProps} = props
    const history = useUndoRedo({message: ''})

    const msg = useI18nMsg(({ translate }) => {
        return {
            title: translate('Home'),
        }
    })

    return (
        <div
            {...otherProps}
            className={classes('HomeView-0d51 std-theme light', className)}
        >
            <Header/>

            <h1 className="page-title">
                {msg.title}
            </h1>

            <div className="std-stack h">
                <Button
                    disabled={history.undoStack.length === 0}
                    onClick={history.onUndo}
                >
                    Undo
                </Button>
                <Button
                    disabled={history.redoStack.length === 0}
                    onClick={history.onRedo}
                >
                    Redo
                </Button>
                <Input
                    value={history.state.message}
                    onChange={(value) => history.onSave({message: value})}
                />
            </div>
        </div>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface HomeViewProps extends React.HTMLAttributes<HTMLDivElement> {
}
