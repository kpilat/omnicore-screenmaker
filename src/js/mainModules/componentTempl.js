import Config from "./componentConfigTempl";

// Digital component code creation with desired values
const digitalInit = (component) => {
  console.log(component);
  const newComponent = `
    ${component.id} = new FPComponents.Digital_A();
    ${component.id}.desc = "${component.name}";
    ${component.id}.attachToId("${component.id}");
    ${component.id}.onclick = async function () {
        ${component.alertMessage ? Config.alertMessage(component) :

            (
                component.action === "set-value"
                ? Config.setValue(component)
                : "",
                component.action === "toggle-signal"
                ? Config.toggleSignal(component)
                : ""
            )
        }
    };
    ${
      component.targetType === "signal"
        ? Config.subscribeSignal(component)
        : ""
    }
    ${
      component.targetType === "rapid"
        ? Config.subscribeVariable(component)
        : ""
    }
    try {
        let newValue = await ${component.id + component.id}.getValue();
        ${component.id}.active = newValue;
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
    }
    try {
        ${
          component.id + component.id
        }.addCallbackOnChanged(async (newValue) => {
            if (newValue == undefined) {
                newValue = await ${component.id + component.id}.getValue();
            }
            ${component.id}.active = newValue;
        })
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${
          component.signalName
        }\`]);
    }
    `;
  return newComponent;
};

const buttonInit = (component) => {
    console.log(component); 
  const newComponent = `
        ${component.id} = new FPComponents.Button_A();
        ${component.id}.attachToId("${component.id}");
        ${component.id}.text = "${component.text}";
        ${component.id}.onclick = async function () {
            ${component.alertMessage ? Config.alertMessage(component) :
                (
                    component.action === "increase-value"
                    ? Config.increaseValue(component)
                    : "",

                    component.action === "decrease-value"
                    ? Config.decreaseValue(component)
                    : "",

                    component.action === "set-value"
                    ? Config.setValue(component)
                    : "",

                    component.action === "toggle-signal"
                    ? Config.toggleSignal(component)
                    : ""
                )
            }
        };
        ${
        component.targetType === "signal"
            ? Config.subscribeSignal(component)
            : ""
        }
        ${
        component.targetType === "rapid"
            ? Config.subscribeVariable(component)
            : ""
        }
    `;
  return newComponent;
};

const switchInit = (component) => {
    console.log(component); 
  const newComponent = `
        ${
        component.targetType === "signal"
            ? Config.subscribeSignal(component)
            : ""
        }
        ${
        component.targetType === "rapid"
            ? Config.subscribeVariable(component)
            : ""
        }
        ${component.id} = new FPComponents.Switch_A();
        ${component.id}.attachToId("${component.id}");
        ${component.id}.onchange = async function (active) {
            ${component.alertMessage ? Config.alertMessage(component) :
                (
                    component.action === "increase-value"
                    ? Config.increaseValue(component)
                    : "",

                    component.action === "decrease-value"
                    ? Config.decreaseValue(component)
                    : "",

                    component.action === "set-value"
                    ? Config.setValue(component)
                    : "",

                    component.action === "toggle-signal"
                    ? Config.toggleSignal(component)
                    : ""
                )
            }
        }
        try {
            let newValue = await ${component.id + component.id}.getValue();
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
            ${
              component.id + component.id
            }.addCallbackOnChanged(async (newValue) => {
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

export default { digitalInit, buttonInit, switchInit, toggleInit };
