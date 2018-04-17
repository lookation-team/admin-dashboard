import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DtoPosition from '../dto/DtoPosition'
import DashboardActions from '../actions/DashboardActions'
import Store from '../../store/Store'
import { mapIcon } from '../../assets/map-icon.png'

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
    }

    /*componentDidUpdate() {
        const points = this.props.positions.map(p => this.getPoint(p))
        console.log(points)
        points.forEach(p => {
            this.map.addLayer(p) 
        })
    }*/

    getPoint(position) {
        const { longitude, latitude } = position
        console.log(position, longitude, latitude)
        const pos = new ol.source.Vector()
        const vector = new ol.layer.Vector({
            source: pos
        })
        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getPosition(longitude, latitude)),
            name: position.id
        })
        this.points[position.id] = point
        point.setStyle(
            new ol.style.Style({
                image: new ol.style.Icon({
                    scale: 0.5,
                    anchor: [0.5, 1],
                    src: mapIcon
                }),
                zIndex: 1
            })
        )
        pos.addFeature(point)
        return vector
    }

    getPosition(x, y) {
        return ol.proj.transform([+x, +y], 'EPSG:4326', 'EPSG:3857')
    }

    render() {
        return(
            <div>
                <div id='map' className='map'/>
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