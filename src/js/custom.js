import DragNDrop from './modules/dragNDrop'
import Rescale from './modules/rescale'
import WorkSpace from './modules/workSpace'
import AppBuilder from './modules/appBuilder'

window.onload = () => {
    DragNDrop.init();
    Rescale.init();
    WorkSpace.init();
    AppBuilder.init();
}