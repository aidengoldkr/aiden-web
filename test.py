import requests

t_map_api_key = 'n8zsIWsyk34hbmYfX4PzbjN4CKizkXD3FdvGi5ig'

def t_map_header():
    headers = {
    'appKey': t_map_api_key,
    'Content-Type': 'application/json'
    }
    return(headers)

def get_x_y(keyword):
    x_y_url = 'https://apis.openapi.sk.com/tmap/pois'
    headers = t_map_header()
    keyword_e = keyword.encode('utf-8')

    x_y_params = {
        'version' : 1,
        'searchKeyword' : keyword_e,
        'searchType' : 'all',
    }
    
    x_y_response = requests.get(x_y_url, headers=headers, params=x_y_params)
    #try:
    x_y_data = x_y_response.json()

    x = x_y_data['searchPoiInfo']['pois']['poi'][0]['newAddressList']['newAddress'][0]['centerLon']
    y = x_y_data['searchPoiInfo']['pois']['poi'][0]['newAddressList']['newAddress'][0]['centerLat']
    name = x_y_data['searchPoiInfo']['pois']['poi'][0]['name']
    address = x_y_data['searchPoiInfo']['pois']['poi'][0]['newAddressList']['newAddress'][0]['fullAddressRoad']
    return (x,y,name,address)

def reverse_geo(lat,lon):
    r_geo_url = 'https://apis.openapi.sk.com/tmap/geo/reversegeocoding'
    headers = t_map_header()

    r_geo_parms = {
        'version': 1,       
        'lon' : lon,
        'lat' : lat,
        'addressType' : 'A02'
    }

    r_geo_response = requests.get(r_geo_url, headers=headers, params=r_geo_parms)
    r_geo_data = r_geo_response.json()

    return(r_geo_data['addressInfo']['fullAddress'])


print(reverse_geo('37.49560274','127.05768249'))
print(get_x_y('37.49560274','127.05768249'))
