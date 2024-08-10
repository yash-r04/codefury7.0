from flask import Flask, request, jsonify, render_template
import folium

app = Flask(__name__)

geofence_data = {
    #co=ordiantes of uvce
    'center': (12.975637304406673, 77.58669175198709), 
    'radius': 1.0,
    'intensity': 'blue',
    'disaster': 'will be updated'
}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            latitude = float(request.form.get('latitude', geofence_data['center'][0]))
            longitude = float(request.form.get('longitude', geofence_data['center'][1]))
            radius = float(request.form.get('radius', geofence_data['radius']))
            intensity = str(request.form.get('intensity', 'blue'))  
            disaster = str(request.form.get('disaster', 'to be noticed'))  
            geofence_data['intensity']= intensity
            geofence_data['center'] = (latitude, longitude)
            geofence_data['radius'] = radius
            geofence_data['disaster'] = disaster

        except ValueError as e:
            return f"ValueError: {e} - Ensure that latitude, longitude, and radius are valid numbers."

    map = folium.Map(location=geofence_data['center'], zoom_start=15)

    folium.Circle(
        radius=geofence_data['radius'] * 1000,
        location=geofence_data['center'],
        popup=geofence_data['disaster'],
        color=geofence_data['intensity'],
        fill=True,
        fill_color=geofence_data['intensity'],
    ).add_to(map)

    map_html = map._repr_html_()

    return render_template('user.html', map_html=map_html, geofence_data=geofence_data)

@app.route('/location', methods=['POST'])
def location():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    return jsonify({
        'latitude': latitude,
        'longitude': longitude,
    })

if __name__ == '__main__':
    app.run(debug=True,port = 5000,host='localhost')
