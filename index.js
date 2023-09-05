// Event Slots
import EvntData from "./datas/onGoingEvent.json" assert { type: 'json' };

const Event_ElementId_Array = ["EvtPost1","EvtPost2","EvtPost3","EvtPost4","EvtPost5","EvtPost6","EvtPost7","EvtPost8","EvtPost9","EvtPost10"];
const Event_JSONKey_Array = ["event1","event2","event3","event4","event5","event6","event7","event8","event9","event10"];
const MouthStrConvert_Array = ["","Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];

function HideFrame(slotName) {
    const Frame = document.querySelector("#"+slotName+"_frame");
    Frame.style.visibility = "hidden";
};
function CheckFile() {
    var EmptySlotIndex = [];
    for (var i = 0; i < 10; i++) {
        if (EvntData[Event_JSONKey_Array[i]].IsActive == true){
           // var event = EvntData[Event_JSONKey_Array[i]];
           //  var elementId = Event_ElementId_Array[i];
           // Load_eventToSlot(elementId,event.Title,event.Discription)
           EmptySlotIndex.push(i);
        } else {
         //  var elementId = Event_ElementId_Array[i];
         //  HideFrame(elementId);
        };
    }
    FillEmptySlots(EmptySlotIndex);
};

function Load_eventToSlot(slotName,SlotTitle,SlotText,SlotPicture) {
    const Title = document.querySelector("#"+slotName); //EvtPost1
    Title.innerHTML = SlotTitle;
    const Discrip = document.querySelector("#"+slotName+"_text");
    Discrip.innerHTML = SlotText;
};

function FillEmptySlots(EmptySlotIndex) {
    for (var i = 0; i < (EmptySlotIndex.length); i++) {
        var event = EvntData[Event_JSONKey_Array[EmptySlotIndex[i]]];
        var elementId = Event_ElementId_Array[i];
        Load_eventToSlot(elementId,event.Title,GetEventDate(event.Date)+" | "+event.Discription);
    };
    for (var i = (EmptySlotIndex.length); i < 10; i++) {
        var elementId = Event_ElementId_Array[i];
        HideFrame(elementId);
    };
};

function GetEventDate(DateStr) {
    try{
    var d = new Date();
    var Year = d.getUTCFullYear();
    var IptYear = parseInt(DateStr.substring(0,4));
    var IptMonth = parseInt(DateStr.substring(4,6));
    var IptDay = parseInt(DateStr.substring(6,8));
    var IptHour = parseInt(DateStr.substring(8,10));
    var IptMinute = parseInt(DateStr.substring(10,12));

    if (IptDay == 0 || IptDay > 31) {
        IptDay = "";
    };
    if (IptHour < 0 || IptHour > 24) {
        IptHour = "";
    };
    if (IptMinute < 0 || IptMinute >= 60) {
        IptMinute = "";
    };
    
    var finalStr = "Date: "+MouthStrConvert_Array[IptMonth]+(IptDay.toString())+" "+(IptHour.toString())+":"+(IptMinute.toString());
    if (IptYear != Year) {
        finalStr = "Date: "+ (IptYear.toString())+" "+MouthStrConvert_Array[IptMonth]+" "+(IptDay.toString())+" "+(IptHour.toString())+":"+(IptMinute.toString());
    };
    return finalStr;
} catch(err) {
    console.log(err);
    return "";
}
};

CheckFile();
