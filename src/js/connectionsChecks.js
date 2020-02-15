import {
    getWorkspace, checkInTriggerInfo, getTriggerList, getAllTriggerInWorkspace,
    getBlockType, enable_after, disable_after, setTriggerList, getActionList,
    setActionList, getRuleBlock, hasTriggerChild, getOperatorWithoutNextConn,
    checkIfTriggerOperator, getTriggerWithNoNextConnection, checkIfAction,
    getNextViableBlockForAction, hasActionChild,
  } from "./main.js";



  const availableConnections = {
    ACTIONS : ["action", "parallel_dynamic"],
    TRIGGERS : ["trigger"],
  };

  const availableNextStatements = {
    trigger : ["triggerOperator", "not_dynamic"],
    parallel_dynamic : ["action"],
    triggerOperator : ["trigger"],
    action_placeholder : ["action"]
  }

/** 
 * Returns the input to whom the previous connection of the passed block
 * is linkd to in the previous block. 
 * @return {Blockly.Input} The input that the connection belongs to or null if
 *     no parent exists.
 * @package
 * 
 */
 function getParentInput(block, parent) {
  var parentInput = null;
  var inputs = parent.inputList;
  let parentConnection = null;
  let parentConnectionsArr = parent.getConnections_(true); 
  for (let i = 0; i < parentConnectionsArr.length; i++){
    if(parentConnectionsArr[i].x_ === block.previousConnection.x_ && parentConnectionsArr[i].y_ === block.previousConnection.y_){
      parentConnection = parentConnectionsArr[i];
      break;
    }
  }

  for (var idx = 0; idx < block.inputList.length; idx++) {
    if (inputs[idx].connection === parentConnection) {
      parentInput = inputs[idx];
      break;
    }
  }
  return parentInput;
};

    /**
     * Returns true if the connection to parent element is legal
     */ 
  export function checkConnection(child, parentBlock) {     
      // if is a "rule" type block, check the inputs. Else, check the next 
      // statement
      if(parentBlock.type === "rule") {
        let parentInput = getParentInput(child, parentBlock);
        if(parentInput && availableConnections[parentInput.name] && availableConnections[parentInput.name].includes(child.blockType)){
            return true;
        }
        else {
          return false;
        }
      }
      else {
        if(availableNextStatements[parentBlock.blockType] && availableNextStatements[parentBlock.blockType].includes(child.blockType)){
          return true;
        }
        else {
          return false;
        }      
      }
  }