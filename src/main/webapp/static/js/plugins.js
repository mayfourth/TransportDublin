
// remap jQuery to $
(function($){

 


})(window.jQuery);



/**
 * Context menu
 */

var clickedLatLng;
var contextMenu = $(document.createElement('ul')).attr('id', 'contextMenu');

contextMenu.append('<li><a href="#directionsFrom">Directions From Here</a></li>'
				+ '<li><a href="#directionsTo">Directions To Here</a></li>'
				+ '<li><a href="#zoomIn">Zoom in</a></li>'
				+ '<li><a href="#zoomOut">Zoom out</a></li>');


contextMenu.bind('contextmenu', function() {
	return false;
});


// Set some events on the context menu links
contextMenu.find('a').click(function() {

	contextMenu.fadeOut(75);
	var action = $(this).attr('href').substr(1);

	switch (action) {

	case 'directionsFrom':
		createStartMarker(clickedLatLng.lat(),clickedLatLng.lng() );
		if (Demo.directionMarkers[1] != null) 
			getDirections();
		break;

	case 'directionsTo':
		createEndMarker(clickedLatLng.lat(),clickedLatLng.lng() );
		if (Demo.directionMarkers[0] != null) 
			getDirections();
		break;

	case 'zoomIn':
		Demo.map.setZoom(Demo.map.getZoom() + 1);
		Demo.map.panTo(clickedLatLng);
		break;

	case 'zoomOut':
		Demo.map.setZoom(Demo.map.getZoom() - 1);
		Demo.map.panTo(clickedLatLng);
		break;
	}
	return false;
});

contextMenu.find('a').hover(function() {
	$(this).parent().addClass('hover');
}, function() {
	$(this).parent().removeClass('hover');
});

function showContextMenu(e) {

	contextMenu.hide();
	var mapDiv = $(Demo.map.getDiv()), x = e.pixel.x, y = e.pixel.y;
	clickedLatLng = e.latLng;

	// adjust if clicked to close to the edge of the map
	if (x > mapDiv.width() - contextMenu.width())
		x -= contextMenu.width();

	if (y > mapDiv.height() - contextMenu.height())
		y -= contextMenu.height();

	// Set the location and fade in the context menu
	contextMenu.css({
		top : y,
		left : x
	}).fadeIn(100);
};


var aDataSet = [

    			['0','I0001','1','Parnell Square East'],
    			['1','O0001','1','Poolbeg Extension'],
    			['2','I0002','2','Parnell Square East'],
    			['3','O0002','2','Sandymount (St. Johns Church)'],
    			['4','I0003','3','Larkhill'],
    			['5','O0004','3','Sandymount (St. Johns Church)'],
    			['6','I0004','4','Harristown'],
    			['7','O0004','4','Monkstown Avenue'],
    			['8','I0005','5','O Connell St.'],
    			['9','O0005','5','Sandyford Industrial Estate'],
    			['10','I0007','7','O Connell St.'],
    			['11','O0007','7','Loughlinstown / Cherrywood'],
    			['12','I007a','7a','O Connell St.'],
    			['13','O007a','7a','Mackintosh Park'],
    			['14','I007b','7b','OConnell St.'],
    			['15','O007b','7b','Shankill'],
    			['16','I007d','7d','O Connell St.'],
    			['17','O007d','7d','Dalkey'],
    			['18','I0008','8','O Connell St.'],
    			['19','O0008','8','Dalkey (Ulverton Rd.)'],
    			['20','I0011','11','Wadelai Park'],
    			['21','O0011','11','Kilmacud / Mather Rd. North'],
    			['22','I011a','11a','Wadelai Park'],
    			['23','O011a','11a','Kilmacud / Mather Rd. North'],
    			['24','I011b','11b','Wadelai Park'],
    			['25','O011b','11b','UCD Belfield'],
    			['26','I0013','13','IKEA (Ballymun)'],
    			['27','O0013','13','Merrion Square'],
    			['28','I013a','13a','IKEA (Ballymun)'],
    			['29','O013a','13a','Merrion Square'],
    			['30','I0014','14','Parnell Square East'],
    			['31','O0014','14','Dundrum Luas Station'],
    			['32','I014a','14a','Parnell Square East'],
    			['33','O014a','14a','Dundrum Luas Station'],
    			['34','I0015','15','Eden Quay'],
    			['35','O0015','15','Scholarstown Rd.'],
    			['36','I015a','15a','Eden Quay'],
    			['37','O015a','15a','Limekiln Avenue'],
    			['38','I015b','15b','Eden Quay'],
    			['39','O015b','15b','Whitechurch'],
    			['40','I015e','15e','Eden Quay'],
    			['41','O015e','15e','Brookwood'],
    			['42','I015f','15f','Eden Quay'],
    			['43','O015f','15f','Ellensborough'],
    			['44','I0016','16','Santry'],
    			['45','O0016','16','Ballinteer (Kingston)'],
    			['46','I016a','16a','Dublin Airport'],
    			['47','O016a','16a','Lower Rathfarnham '],
    			['48','I0017','17','Rialto'],
    			['49','O0017','17','Blackrock'],
    			['50','I017a','17a','From Blanchardstown Centre'],
    			['51','O017a','17a','Kilbarrack'],
    			['52','I0018','18','From Palmerstown '],
    			['53','O0018','18','Sandymount'],
    			['54','I0019','19','Jamestown Rd.'],
    			['55','O0019','19','Bulfin Rd.'],
    			['56','I019a','19a','Jamestown Rd.'],
    			['57','O019a','19a','Limekiln Avenue'],
    			['58','I020b','20b','Eden Quay'],
    			['59','O020b','20b','Beaumont (Ardlea Rd.)'],
    			['60','I0025','25','Merrion Sq.'],
    			['61','O0025','25','Lucan (Dodsboro)'],
    			['62','I025a','25a','Merrion Sq.'],
    			['63','O025a','25a','Lucan (Esker Church)'],
    			['64','I025b','25b','From Merrion Sq.'],
    			['65','O025b','25b','Adamstown Rail Station'],
    			['66','I0026','26','From Merrion Sq.'],
    			['67','O0026','26','Palmerstown (Cemetery)'],
    			['68','I0027','27','Talbot St.'],
    			['69','O0027','27','Clare Hall'],
    			['70','I027b','27b','Eden Quay'],
    			['71','O027b','27b','Harristown'],
    			['72','I029a','29a','Eden Quay'],
    			['73','O029a','29a','Newgrove Cross'],
    			['74','I0031','31','Eden Quay'],
    			['75','O0031','31','Howth Summit'],
    			['76','I031b','31b','Eden Quay'],
    			['77','O031b','31b','Howth Summit'],
    			['78','I0032','32','Eden Quay'],
    			['79','O0032','32','Portmarnock'],
    			['80','I032b','32b','Eden Quay'],
    			['81','O032b','32b','Portmarnock'],
    			['82','I032a','32a','Eden Quay'],
    			['83','O032a','32a','Malahide'],
    			['84','I0033','33','Lower Abbey St.'],
    			['85','O0033','33','Balbriggan'],
    			['86','I033a','33a','Swords'],
    			['87','O033a','33a','Skerries / Balbriggan'],
    			['88','I033b','33b','Swords'],
    			['89','O033b','33b','Portrane'],
    			['90','I033d','33d','St. Stephens Green'],
    			['91','O033d','33d','Portrane'],
    			['92','I0037','37','Baggot St. (Grand Canal)'],
    			['93','O0037','37','Blanchardstown Rd. South'],
    			['94','I0038','38','Baggot St. (Grand Canal)'],
    			['95','O0038','38','Damastown'],
    			['96','I038a','38a','Baggot St. (Grand Canal)'],
    			['97','O038a','38a','Damastown'],
    			['98','I0039','39','Baggot St. (Grand Canal)'],
    			['99','O0039','39','Ongar'],
    			['100','I039a','39a','UCD Belfield'],
    			['101','O039a','39a','Ongar'],
    			['102','I0040','40','Parnell St.'],
    			['103','O0040','40','Finglas (Charlestown)'],
    			['104','I040a','40a','Parnell St.'],
    			['105','O040a','40a','Finglas (Charlestown)'],
    			['106','I040d','40d','Parnell St.'],
    			['107','O040d','40d','Tyrrelstown'],
    			['108','O0041','41','Lower Abbey St.'],
    			['109','I0041','41','Swords Manor'],
    			['110','O041b','41b','Lower Abbey St.'],
    			['111','I041b','41b','Rolestown'],
    			['112','O041c','41c','Lower Abbey St.'],
    			['113','I041c','41c','Swords Manor'],
    			['114','O0042','42','Lower Abbey St.'],
    			['115','I0042','42','Coast Rd. (Malahide)'],
    			['116','O042a','42a','Lower Abbey St.'],
    			['117','I042a','42a','Beaumont Hospital'],
    			['118','O042b','42b','Lower Abbey St.'],
    			['119','I042b','42b','Blunden Drive '],
    			['120','O0043','43','Lower Abbey St.'],
    			['121','I0043','43','Swords Business Park'],
    			['122','O0044','44','Townsend St.'],
    			['123','I0044','44','Enniskerry'],
    			['124','O044b','44b','Dundrum Luas Station'],
    			['125','I044b','44b','Glencullen'],
    			['126','O0045','45','Merrion Square'],
    			['127','I0045','45','Bray (Oldcourt)'],
    			['128','O045a','45a','Dun Laoghaire'],
    			['129','I045a','45a','Ballywaltrim'],
    			['130','O046a','46a','Phoenix Park'],
    			['131','I046a','46a','Dun Laoghaire'],
    			['132','O046e','46e','From Blackrock Station'],
    			['133','I046e','46e','Mountjoy Sq.'],
    			['134','O0047','47','Belarmine'],
    			['135','I0047','47','Pearse Street'],
    			['136','O048a','48a','Parnell Square East'],
    			['137','I048a','48a','Ballinteer'],
    			['138','O0049','49','Eden Quay'],
    			['139','I0049','49','Tallaght (The Square)'],
    			['140','O049a','49a','Eden Quay'],
    			['141','I049a','49a','Tallaght (The Square)'],
    			['142','O0050','50','Grand Canal Dock / Ringsend'],
    			['143','I0050','50','Citywest'],
    			['144','O0051','51','City Centre'],
    			['145','I0051','51','Clondalkin (Neilstown)'],
    			['146','O051b','51b','Hawkins St.'],
    			['147','I051b','51b','Grange Castle'],
    			['148','O051c','51c','Hawkins St.'],
    			['149','I051c','51c','Grange Castle'],
    			['150','O051d','51d','Hawkins St./Waterloo Rd.'],
    			['151','I051d','51d','Clondalkin'],
    			['152','O0053','53','Eden Quay'],
    			['153','I0053','53','East Wall Rd.'],
    			['154','O053a','53a','Eden Quay'],
    			['155','I053a','53a','North Wall (Alexandra Rd.)'],
    			['156','O054a','54a','Eden Quay'],
    			['157','I054a','54a','Ellensborough / Kiltipper Way'],
    			['158','O0056','56','Ringsend Rd. / Dolphins Barn'],
    			['159','I0056','56','Tallaght (The Square)'],
    			['160','O056a','56a','Ringsend Rd. / Dolphins Barn'],
    			['161','I056a','56a','Tallaght (The Square)'],
    			['162','O0059','59','Dun Laoghaire'],
    			['163','I0059','59','Mackintosh Park'],
    			['164','O0063','63','Dun Laoghaire'],
    			['165','I0063','63','Kilternan'],
    			['166','O0065','65','Eden Quay'],
    			['167','I0065','65','Blessington / Ballymore'],
    			['168','O065b','65b','Eden Quay'],
    			['169','I065b','65b','Citywest'],
    			['170','O0066','66','Merrion Sq.'],
    			['171','I0066','66','Maynooth'],
    			['172','O066a','66a','Merrion Sq.'],
    			['173','I066a','66a','Leixlip (Captains Hill)'],
    			['174','O066b','66b','Merrion Sq.'],
    			['175','I066b','66b','Leixlip (Castletown)'],
    			['176','O0067','67','Merrion Sq.'],
    			['177','I0067','67','Maynooth'],
    			['178','O0068','68','Hawkins St.'],
    			['179','I0068','68','Greenogue Business Park'],
    			['180','O0069','69','Hawkins St.'],
    			['181','I0069','69','Rathcoole'],
    			['182','O0070','70','Baggot St. (Grand Canal)'],
    			['183','I0070','70','Dunboyne'],
    			['184','O0074','74','Britain Quay'],
    			['185','I0074','74','Stocking Avenue'],
    			['186','O074a','74a','Britain Quay'],
    			['187','I074a','74a','Stocking Avenue'],
    			['188','O0075','75','The Square Tallaght'],
    			['189','I0075','75','Dun Laoghaire'],
    			['190','O0076','76','Ballyfermot / Blanchardstown'],
    			['191','I0076','76','Fettercairn'],
    			['192','O076a','76a','Ballyfermot / Blanchardstown'],
    			['193','I076a','76a','Tallaght (The Square)'],
    			['194','O076b','76b','Ballyfermot / Blanchardstown'],
    			['195','I076b','76b','Balrothery'],
    			['196','O0077','77','Grand Canal Dock / Ringsend'],
    			['197','I0077','77','Jobstown'],
    			['198','O077a','77a','Grand Canal Dock Ringsend'],
    			['199','I077a','77a','Tallaght (The Square)'],
    			['200','O0078','78','Aston Quay'],
    			['201','I0078','78','Liffey Valley Centre'],
    			['202','O078a','78a','Aston Quay'],
    			['203','I078a','78a','Liffey Valley Centre'],
    			['204','O0079','79','Aston Quay'],
    			['205','I0079','79','Spiddal Park '],
    			['206','O079a','79a','Aston Quay'],
    			['207','I079a','79a','Park West'],
    			['208','O0083','83','Harristown'],
    			['209','I0083','83','Kimmage'],
    			['210','O0084','84','UCD Belfield'],
    			['211','I0084','84','Newcastle'],
    			['212','O0090','90','Heuston Station'],
    			['213','I0090','90','IFSC'],
    			['214','O0102','102','Sutton Station'],
    			['215','I0102','102','Dublin Airport'],
    			['216','O0104','104','Clontarf Bus Depot'],
    			['217','I0104','104','Cappagh Hospital'],
    			['218','O0111','111','Loughlinstown Park'],
    			['219','I0111','111','Dun Laoghaire'],
    			['220','O0114','114','Ticknock'],
    			['221','I0114','114','Blackrock Station'],
    			['222','O0116','116','Burlington Hotel'],
    			['223','I0116','116','Whitechurch'],
    			['224','O0118','118','Kilternan'],
    			['225','I0118','118','DOlier St.'],
    			['226','O0120','120','Parnell St.'],
    			['227','I0120','120','Ashtown Station '],
    			['228','O0121','121','Cabra (Ratoath Rd.)'],
    			['229','I0121','121','Drimnagh Rd.'],
    			['230','O0122','122','Ashington'],
    			['231','I0122','122','Drimnagh Rd.'],
    			['232','O0123','123','From Walkinstown '],
    			['233','I0123','123','Marino'],
    			['234','O0128','128','Rathmines )'],
    			['235','I0128','128','Clongriffin'],
    			['236','O0130','130','Lwr. Abbey St.'],
    			['237','I0130','130','Castle Ave.'],
    			['238','O0140','140','Leeson St.'],
    			['239','I0140','140','Finglas (IKEA)'],
    			['240','O0142','142','Portmarnock'],
    			['241','I0142','142','Rathmines' ],
    			['242','O0145','145','Heuston Rail Station'],
    			['243','I0145','145','Kilmacanogue'],
    			['244','O0150','150','Fleet St.'],
    			['245','I0150','150','Rossmore'],
    			['246','O0151','151','From Docklands'],
    			['247','I0151','151','Foxborough'],
    			['248','O0161','161','Nutgrove Shopping Centre'],
    			['249','I0161','161','Rockbrook'],
    			['250','O0184','184','Bray Rail Station'],
    			['251','I0184','184','Newtownmountkennedy'],
    			['252','O0185','185','Bray Rail Station'],
    			['253','I0185','185','Shop River'],
    			['254','O0210','210','Tallaght (The Square)'],
    			['255','I0210','210','Liffey Valley Centre'],
    			['256','O0220','220','Ballymun'],
    			['257','I0220','220','Ladys Well Rd.'],
    			['258','O0236','236','Blancardstown Centre'],
    			['259','I0236','236','Ballycoolin'],
    			['260','O0238','238','Ladys Well Rd.'],
    			['261','I0238','238','Tyrelstown'],
    			['262','O0239','239','Blanchardstown Centre'],
    			['263','I0239','239','Liffey Valley '],
    			['264','O0270','270','Blanchardstown Centre'],
    			['265','I0270','270','Dunboyne'],
    			['266','O0747','747','Central Bus Station'],
    			['267','I0747','747','Dublin Airport'],
    			['268','O0748','748','Heuston Rail Station'],
    			['269','I0748','748','Dublin Airport']
    			];


