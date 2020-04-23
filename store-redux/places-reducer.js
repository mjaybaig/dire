import {ADD_MACHINE} from './places-actions'
import Machine from '../models/machineCategory'
import {MACHINECATEGORY} from '../data/machineDetail'


const initialState = {
    machines : MACHINECATEGORY
}
// will stent to inital state if no other state is passed
export default (state = initialState, action) => {
    switch(action.type){
        case ADD_MACHINE:
          const newMachine = new Machine(action.machineData.title)
            return{
                //adds new item to the array
                machines: state.machines.concat(newMachine)
            }
    }
    return state
}