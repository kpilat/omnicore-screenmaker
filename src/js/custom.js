import DragNDrop from './modules/dragNDrop'
import Rescale from './modules/rescale'
import WorkSpace from './modules/workSpace'
import ComponentParser from './modules/componentParser'

window.onload = () => {
    DragNDrop.init();
    Rescale.init();
    WorkSpace.init();
    ComponentParser.init();
}
