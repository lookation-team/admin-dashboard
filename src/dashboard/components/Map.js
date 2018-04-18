import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DtoPosition from '../dto/DtoPosition'
import DashboardActions from '../actions/DashboardActions'
import Store from '../../store/Store'
import mapIcon from '../../assets/map-icon.png'
import { find, maxBy, minBy } from 'lodash'
import LookerAction from '../../Admin/actions/LookerAction'
import LookerListDto from '../../Admin/dto/LookerListDto'

class Map extends Component {
    componentWillMount() {
        Store.dispatch(DashboardActions.setInitialPositions())
        Store.dispatch(LookerAction.fetchLookers())
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
            if (features && features.length) {
                const coords = features[0].getGeometry().getCoordinates()
                const content = features.map(p => {
                    const looker = find(this.props.lookers, l => l.id === p.N.name)
                    return `<span class='looker-tooltip pointer' id='${looker.id}'>${looker.email}</span>`
                }).join('<br/>')
                console.log(content)
                overlay.getElement().innerHTML = content
                const lookerTooltips = document.getElementsByClassName('looker-tooltip')
                for(let i = 0; i< lookerTooltips.length; i++) {
                    lookerTooltips.item(i).onclick = () => this.props.onSelectLooker(lookerTooltips.item(i).id)
                }
                overlay.setPosition(coords)
                console.log(this.props.lookers, features[0].N.name)
            } else {
                this.props.onSelectLooker(null)
            }
        })

        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.positions !== this.props.positions && this.props.positions.length) {
            this.createPositions()
        }
    }

    createPositions() {
        this.props.positions.map(p => {
            this.map.addLayer(this.getSimpleLayer(p.id, p.longitude, p.latitude))
        })
        /*const minX = minBy(this.props.positions, p => p.longitude).longitude 
        const minY = minBy(this.props.positions, p => p.latitude).latitude
        const maxX = maxBy(this.props.positions, p => p.longitude).longitude
        const maxY = maxBy(this.props.positions, p => p.latitude).latitude
        console.log(minX, minY, maxX, maxY)
        console.log(this.map.getView(), this.map.getSize())
        this.map.getView().fit(ol.proj.transformExtent([minX, minY, maxX, maxY], 'EPSG:4326', 'EPSG:3857'), {duration: 1000})*/
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
    positions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition)),
    lookers: PropTypes.arrayOf(PropTypes.instanceOf(LookerListDto)),
    onSelectLooker: PropTypes.func
}
  
const mapStateToProps = (store) => {
    return {
        positions: store.DashboardReducer.positions,
        lookers: store.LookerReducer.lookers
    }
}

export default connect(mapStateToProps)(Map)