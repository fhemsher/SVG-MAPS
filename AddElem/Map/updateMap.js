var MapDoc
var LoadedMapArray =[]
var MapIdArray =[]
function getMapLibrary()
{
    hideAllHelps()
    if(!MapDoc)
    {
        MapIdArray =[]
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Map.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText

            //---DOMParser---
            var parser = new DOMParser();
            MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
            //---clear previous table----
            var rows = mapTable.rows
            for(var k = rows.length-1; k>=0; k--)
                mapTable.deleteRow(rows[k])

                var rowCnt = 0
                var rowColor = 0
                //----write table---
                var groups = MapDoc.childNodes
                if(groups.length>0)
                mapEmptyDiv.style.display = "none"
                else
                    mapEmptyDiv.style.display = ""
                    for(var k = 0; k<groups.length; k++)
                {
                    var group = groups.item(k)
                    if(group.nodeName!="#text")
                    {

                        var email = group.getAttribute("email")

                        var id = group.getAttribute("id")
                        MapIdArray.push(id)
                        var title = group.getAttribute("title")
                        var inquiry = group.getAttribute("inquiry")
                                            var yesNoCheck=""
                                              if(inquiry=="true")
                                                yesNoCheck="checked"


                        var inquiryBg = "#73c2fb"
                        if(inquiry=="true")
                            var inquiryBg = "red"
                            var comment = xml2txt(group.getAttribute("comment"))

                            var row = mapTable.insertRow(rowCnt++)
                            row.id = "row"+id

                            rowColor++
                            var cntr = (rowColor)/2+""
                            if(cntr.indexOf('.')!=-1)
                            var bg = "#aadc82"
                            else
                                var bg = "#f0e99c"
                                row.style.background = bg

                                var titleCell = row.insertCell(0)
                                titleCell.style.width = "77%"
                                titleCell.innerHTML = "<b style=background:"+inquiryBg+">("+(k+1)+".)</b><div contenteditable='false'  onkeyup=if(MyMapLoaded==true){this.style.background='orange'} id=titleValue"+id+" style=font-size:110%;background:#e0b0ff;border:0px;width:99%;background:"+bg+">"+title+"</div>"
                                if(SendMapId)
                                var showCell = row.insertCell(1).innerHTML = "<button  style=visibility:hidden id=showMapButton"+id+"  title='show this map ' onClick=loadMyMap('"+id+"')  >show</button>"
                                else
                                    var showCell = row.insertCell(1).innerHTML = "<button  id=showMapButton"+id+"  title='show this map ' onClick=loadMyMap('"+id+"')  >show</button>"
                                 if(SendMapId==id)
                                {
                                    var hideCell = row.insertCell(2).innerHTML = "<button  id=hideMapButton"+id+"  title='Hide this map ' onClick=hideMap('"+id+"')  >hide</button>"
                                    MyMapLoaded = true
                                }
                                else
                                {
                                    var hideCell = row.insertCell(2).innerHTML = "<button disabled id=hideMapButton"+id+"  title='Hide this map ' onClick=hideMap('"+id+"')  >hide</button>"
                                }

                               var publishCell = row.insertCell(3).innerHTML = "<button disabled id=publishMapButton"+id+"  title='Publish this map ' onClick=publishMap('"+id+"')  >publish</button>"


                                var inquiryRow = mapTable.insertRow(rowCnt++)
                                inquiryRow.style.background = bg
                                inquiryRow.id = "inquiryRow"+id
                                var inquiryCell = inquiryRow.insertCell(0)
                                inquiryCell.colSpan = 4
                                inquiryCell.innerHTML = "Viewier Inquiries: "+" <input disabled "+yesNoCheck+"  click=if(MyMapLoaded==true){this.style.background='orange'}  id=inquiryYesCheck"+id+" type=checkbox style=background:"+bg+";  /> "
                                var commentRow = mapTable.insertRow(rowCnt++)
                                commentRow.style.background = bg
                                commentRow.id = "commentRow"+id
                                var commentCell = commentRow.insertCell(0)
                                commentCell.colSpan = 4
                                commentCell.innerHTML = "<div contenteditable='false'  onkeyup=if(MyMapLoaded==true){this.style.background='orange'}  id=commentValue"+id+" style='border:1px solid black;padding:6px;text-align:justify;background:"+bg+";width:95%;'>"+comment+"</div>"

                                if(email==CookieEmail)
                            {
                                var editRow = mapTable.insertRow(rowCnt++)
                                editRow.style.background = bg
                                editRow.id = "editRow"+id
                                var editCell = editRow.insertCell(0)
                                editCell.colSpan = 4
                                editCell.align = "center"
                                if(SendMapId)
                                    editCell.innerHTML = "<button style='background:orange' id=editMapButton"+id+"  title='Edit photo, elements, and change boundaries' onClick=editMap('"+id+"')  >edit</button>"
                                    else
                                        editCell.innerHTML = "<button disabled style='background:orange' id=editMapButton"+id+"   title='Edit photo, elements, and change boundaries'  onClick=editMap('"+id+"')  >edit</button>"

                                        editCell.innerHTML += "<button disabled style='background:orange' id=editCancelMapButton"+id+"  title='Cancel Edit this Map' onClick=cancelEdit()  >cancel</button>"
                                        editCell.innerHTML += "<button disabled style='background:orange' id=editFinishMapButton"+id+"  title='Finish Edit this Map' onClick=finishEditMap()  >finish</button>"
                                        editCell.innerHTML += "<button title='Remove this map from the Library' id=deleteMapButton"+id+" onClick=deleteMap('"+id+"') style=background:red >delete</button>"

                            }

                            var hzRow = mapTable.insertRow(rowCnt++)
                            hzCell = hzRow.insertCell(0)
                            hzCell.colSpan = 4
                            hzCell.innerHTML = "<hr style='border-width:4px;border-color:black;width:100%' >"
                    }
                }
                if(!EditMapId)
            {
                mapTableCloseButton.style.visibility = "visible"
                LoadedMapArray =[]
                mapTableDiv.style.top = "60px"
                mapTableDiv.style.visibility = "visible"
                var height = 540
                d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
                mapTableDiv.style.visibility = "visible"
                mapTableDiv.style.overflow = "auto"

                getMapLibraryButton.style.borderStyle = "inset"
            }
            if(SendMapId && document.getElementById("hideMapButton"+SendMapId))
            {
                document.getElementById("hideMapButton"+SendMapId).disabled = false

            }

            SendMapId = null
            disableAllButtons()

        }
        xhr.send()

    }
    else
    {
        mapTableCloseButton.style.visibility = "visible"
        LoadedMapArray =[]
        mapTableDiv.style.top = "60px"
        mapTableDiv.style.visibility = "visible"
        var height = 540
        d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
        mapTableDiv.style.visibility = "visible"
        mapTableDiv.style.overflow = "auto"

        disableAllButtons()
    }

}

function refreshMapLibrary()
{
    var cw = addElemMapCw
    MapDoc = null
    closeDrawMap()
    getMapLibrary()
    cw.refreshMapLibraryButton.disabled = true
}

function closeMapTable()
{
    for(var k = 0; k<LoadedMapArray.length; k++)
    {
        var map = LoadedMapArray[k]
        var rects = map.getElementsByTagName("rect")
        var coverRect = rects[rects.length-1]
        coverRect.setAttribute('onmousedown', "editDrawMap("+map.id+",evt)")
        map.setAttribute("class", "mapElem")
        coverRect.style.cursor = "default"
    }
    mySVG.removeAttribute("onmousedown")
    mySVG.removeAttribute("onmousemove")
    mySVG.removeAttribute("onmouseup")

    LoadedMapArray =[]
    showSourceSVG()
    mapTableDiv.style.overflow = "hidden"
    var height = 1
    d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
    setTimeout('mapTableDiv.style.visibility = "hidden"', 900)

    getMapLibraryButton.style.visibility = ""
    mapTableCloseButton.style.visibility = "hidden"
    getMapLibraryButton.style.borderStyle = ""
    enableAllButtons()

    if(MyMapLoaded==true)
    {
        disableAllButtons()
        getMapLibraryButton.style.visibility = "visible"
        getMapLibraryButton.innerHTML = "Hide Map"
        getMapLibraryButton.disabled = false
        gpsShowHideDiv.style.visibility = 'hidden'

    }

}
