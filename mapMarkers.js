var MarkersDoc
var Markers =[]
function locateMapMarkers()
{
    Markers =[]
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Map.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText
        var parser = new DOMParser();
        MarkersDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

        for(var k = 0; k<MarkersDoc.childNodes.length; k++)
        {
            var map = MarkersDoc.childNodes.item(k)

            var mapCenterLat = +map.getAttribute("MyMapCenterLat")
            var mapCenterLng = +map.getAttribute("MyMapCenterLng")
            var title = "<div style=width:100px;cursor:default onClick=loadPreviewMap('"+map.id+"') title='click to preview map'>("+(k+1)+".) "+map.getAttribute("title")+"</div>"
            var inquiry = map.getAttribute("inquiry")

            if(inquiry=="true")
            {
                //---red marker---
                var iconOptions =
                {
                iconUrl: 'Images/redMarker.svg',
                iconSize:[25, 80]
                }

            }
            else
            {
                var iconOptions =
                {
                iconUrl: 'Images/blueMarker.svg',
                iconSize:[25, 80]
                }

            }
            var customIcon = L.icon(iconOptions);
            var markerOptions =
            {
                //title: title,
                //clickable: true,

            icon: customIcon
            }
            var marker = new L.marker([mapCenterLat, mapCenterLng], markerOptions)
            .bindPopup(title)
            .addTo(MyMap);
            marker._id = "marker_"+(k+1)
            Markers.push(marker)


        }

        console.log(Markers.length)
    }
    xhr.send()
}

var ClearedMarkerId
function clearMarker(id)
{

    var markersArray =[]
    Markers.forEach(function(marker)
        {

            if (marker._id == id)
            {
                MyMap.removeLayer(marker)

            }
            else
                markersArray.push(marker)
        }
    )

    Markers = markersArray
    ClearedMarkerId = id

}

function returnClearedMarker(id)
{

    if(ClearedMarkerId)
    {
        var itemNum = +ClearedMarkerId.split("_")[1]-1

        var map = MarkersDoc.childNodes.item(itemNum)
        var mapCenterLat = +map.getAttribute("MyMapCenterLat")
        var mapCenterLng = +map.getAttribute("MyMapCenterLng")
        if(document.getElementById("titleValue"+id))
            var checkTitle = document.getElementById("titleValue"+id).innerHTML
            else
                checkTitle = map.getAttribute("title")

        var title = "<div style=width:100px;cursor:default onClick=loadPreviewMap('"+id+"') title='click to preview map'>("+(itemNum+1)+".) "+checkTitle+"</div>"
          if(document.getElementById("inquiryYesCheck"+id))
          {
           var inquiry=document.getElementById("inquiryYesCheck"+id).checked
            if(inquiry==true)
              var  checkInquiry="true"
              else
              var  checkInquiry="false"
          }
          else
            var checkInquiry = map.getAttribute("inquiry")







                    // var plantName=map.getAttribute("plantName")
                if(checkInquiry=="true")
                {
                    //---red marker---
                    var iconOptions =
                    {
                    iconUrl: 'Images/redMarker.svg',
                    iconSize:[25, 80]
                    }

                }
                else
                {
                    var iconOptions =
                    {
                    iconUrl: 'Images/blueMarker.svg',
                    iconSize:[25, 80]
                    }

                }
                var customIcon = L.icon(iconOptions);
        var markerOptions =
        {
            //title: title,
            //clickable: true,

        icon: customIcon
        }
        var marker = new L.marker([mapCenterLat, mapCenterLng], markerOptions)
        .bindPopup(title)
        .addTo(MyMap);

        marker._id = ClearedMarkerId
        Markers.push(marker)
        ClearedMarkerId = null

    }

}
//---finish edit---
function updateClearedMarker(saveMap)
{

    var num = +ClearedMarkerId.split("_")[1]

    var mapCenterLat = +saveMap.getAttribute("MyMapCenterLat")
    var mapCenterLng = +saveMap.getAttribute("MyMapCenterLng")
    var title = "("+num+".) "+saveMap.getAttribute("title")
    var imgPop = saveMap.getElementsByTagName("image")[0]
    var src = imgPop.getAttribute("href")
    var width = +imgPop.getAttribute("naturalWidth")
    var height = +imgPop.getAttribute("naturalHeight")
    var widthFactor = 150/width
    var w = 150
    var h = widthFactor*height

    var img = document.createElement("img")
    img.setAttribute("src", src)
    img.setAttribute("width", w)
    img.setAttribute("height", h)
    img.setAttribute("title", title)

    var plantName = saveMap.getAttribute("plantName")
    if(plantName==""||plantName=="Not known...Please Help (Contact my Email)")
    {
        //---red marker---
        var iconOptions =
        {
        iconUrl: 'Images/redMarker.svg',
        iconSize:[25, 80]
        }

    }
    else
    {
        var iconOptions =
        {
        iconUrl: 'Images/blueMarker.svg',
        iconSize:[25, 80]
        }

    }
    var customIcon = L.icon(iconOptions);
    var markerOptions =
    {
        //title: title,
        //clickable: true,

    icon: customIcon
    }
    var marker = new L.marker([mapCenterLat, mapCenterLng], markerOptions)
    .bindPopup(img)
    .addTo(MyMap);

    marker._id = ClearedMarkerId
    Markers.push(marker)
    ClearedMarkerId = null
}

//----delete or add a map---
function resetMarkers()
{
    Markers.forEach(function(marker)
        {
            MyMap.removeLayer(marker)

        }
    )

    locateMapMarkers()
}