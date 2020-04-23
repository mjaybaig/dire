//action identifier
export const ADD_MACHINE = "ADD_MACHINE"

//action fucntion
export const addMachine = (title) =>{
    return {type: ADD_MACHINE, machineData: {title: title} }
}