import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DtoPosition from '../dto/DtoPosition'
import DashboardActions from '../actions/DashboardActions'
import Store from '../../store/Store'
import mapIcon from '../../assets/map-icon.png'
import { find } from 'lodash'

class Map extends Component {
    componentWillMount() {
        Store.dispatch(DashboardActions.setInitialPositions())
        this.points = {}
    }

    componentDidMount() {
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({source: new ol.source.OSM()})
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([1.41,43]),
                zoom: 5
            })
        })

        const overlay = new ol.Overlay({
            element: document.getElementById('popup-container'),
            positioning: 'bottom-center',
            offset: [0, -10]
        })
        this.map.addOverlay(overlay)

        this.map.on('click', e => {
            overlay.setPosition()
            const features = this.map.getFeaturesAtPixel(e.pixel)
            if (features && features[0]) {
                const pos = find(this.props.positions, p => p.id === features[0].N.name)
                console.log(this.props.positions, features[0].N.name)
                console.log(features, pos)
                if (pos) {
                    console.log(pos)
                    const coords = features[0].getGeometry().getCoordinates()
                    const { userName, email } = pos
                    overlay.getElement().innerHTML = (`<b>${userName}</b> <br/> ${email}`)
                    overlay.setPosition(coords)
                }
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.positions !== this.props.positions) {
            this.createPositions()
        }
    }

    createPositions() {
        this.props.positions.map(p => {
            this.map.addLayer(this.getSimpleLayer(p.id, p.longitude, p.latitude))
            console.log(this.map, this.map.features)
        })
    }

    getSimpleLayer(id, longitude, latitude) {
        const position = new ol.source.Vector()
        const vector = new ol.layer.Vector({
            source: position
        })
        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getPosition(longitude, latitude)),
            name: id
        })
        this.points[id] = point
        point.setStyle(
            new ol.style.Style({
                image: new ol.style.Icon({
                    scale: 0.6,
                    anchor: [0.5, 1],
                    src: mapIcon
                }),
                zIndex: 1
            })
        )
        position.addFeature(point)
        return vector
    }

    getPosition(x, y) {
        return ol.proj.transform([+x, +y], 'EPSG:4326', 'EPSG:3857')
    }

    render() {
        return(
            <div>
                <div id='map' className='map'/>
                <div className='arrow_box' id='popup-container'/>
            </div>
        )
    }
}

Map.propTypes = {
    positions: PropTypes.instanceOf(DtoPosition)
}
  
const mapStateToProps = (store) => {
    return {
        positions: store.DashboardReducer.positions
    }
}

export default connect(mapStateToProps)(Map)