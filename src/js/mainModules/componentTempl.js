import Config from './componentConfigTempl'


// Digital component code creation with desired values
const digitalInit = (component) => {
    const newComponent = `
    ${component.id} = new FPComponents.Digital_A();
    ${component.id}.desc = "${component.name}";
    ${component.id}.attachToId("${component.id}");
    ${component.id}.onclick = async function () {
        var setValue = ${component.id}.active ? 0 : 1;
        ${component.id}.active = !${component.id}.active
        try {
            await ${component.id + component.id}.setValue(setValue);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    };
    ${Config.subscribeSignal(component)}
    try {
        ${component.id + component.id}.addCallbackOnChanged(async (newValue) => {
            // first time this is called, newValue is undefined.
            if (newValue == undefined) {
                newValue = await ${component.id + component.id}.getValue();
            }

            // since 1 and 0 work for true or false we can use the new value directly to set UI status.
            ${component.id}.active = newValue;
        })
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${component.signalName}\`]);
    }
    `;
    return newComponent;
};


const buttonInit = (component) => {
    const newComponent = `
        ${component.id} = new FPComponents.Button_A();
        ${component.id}.attachToId("${component.id}");
        ${component.id}.text = "${component.text}";
        ${component.id}.onclick = async function () {

            let value = await ${component.id + component.id}.getValue();
            value = Number.parseInt(value);
            value ${component.increase ? '+':'-'}= ${component.changeValueBy};
            try {
                await ${component.id + component.id}.setValue(value);
            } catch (e) {
                FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
            }
        };
        ${Config.subscribeVariable(component)}
    `;
    return newComponent;
};


const switchInit = (component) => {
    const newComponent = `
        ${Config.subscribeVariable(component)}
        ${component.id} = new FPComponents.Switch_A();
        ${component.id}.attachToId("${component.id}");
        ${component.id}.onchange = async function (active) {
            console.log(active);
            var message = "Do you really want to set " + ${component.id + component.id}.getName() + " to " + (active ? "true" : "false") + "?";
            FPComponents.Popup_A.confirm("Are you sure?", message, async function (action) {
                if (action == FPComponents.Popup_A.OK) {
                    let value = await ${component.id + component.id}.getValue();
                    console.log("value is " + value);
                    try {
                        // we set the value to inverse of current value. If value is true, we set to false and vice versa.
                        await ${component.id + component.id}.setValue(!value);
                    } catch (e) {
                        FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
                    }
                } else if (action == FPComponents.Popup_A.CANCEL) {
                    // reset switch to value before change.
                    ${component.id}.active = !active;
                }
            });
        }
        try {
            // first time this is called, newValue is undefined.
            let newValue = await ${component.id + component.id}.getValue();

            // since 1 and 0 work for true or false we can use the new value directly to set UI status.
            ${component.id}.active = newValue;
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return newComponent;
};

const toggleInit = (component) => {
  const newComponent = `
        ${component.id} = new FPComponents.Toggle_A();
        ${component.id}.model = [
            { text: "${component.text}" },
            { text: "${component.textAdditional}" },
        ];
        ${component.id}.attachToId("${component.id}");
        ${component.id}.setToggled(0, true);
        ${component.id}.onclick = async (state) => {
            var activeButton = state.changed.find(item => item[1] == true);
            var setValue = activeButton[0];
            
            try {
                await ${component.id + component.id}.setValue(setValue);
            } catch (e) {
                FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
            }
        }
        
        ${Config.subscribeSignal(component)}
        
        try{
            ${component.id + component.id}.addCallbackOnChanged(async (newValue) => {
                if(newValue == undefined) {
                    newValue = await ${component.id + component.id}.getValue();
                }
                // set toggle to active IO.
                ${component.id}.setToggled(newValue, true);
            });
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
  `;

  return newComponent;
};

export default { digitalInit, buttonInit, switchInit, toggleInit }