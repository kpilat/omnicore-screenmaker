import DragNDrop from './modules/dragNDrop'
import Rescale from './modules/rescale'
import WorkSpace from './modules/workSpace'

window.onload = () => {
    DragNDrop.init();
    Rescale.init();
    WorkSpace.init();
}