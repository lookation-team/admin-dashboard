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
import { wsPath } from '../../conf/basepath'
import { LOOKATION_TOKEN } from '../../Home/constants/HomeConstants'
import socket from 'socket.io-client'

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
                zoom: 6
            })
        })

        const io = socket(wsPath, {
            query: {
                token: this.getToken()
            }
        })
        io.on('reconnect_attempt', () => {
            io.io.opts.query = {
                query: this.getToken()
            }
        })

        

        io.on('lookerMouv', pos => {
            if (!this.points[pos.id]) {
                this.map.addLayer(this.getSimpleLayer(pos.id, pos.longitude, pos.latitude))
            } else {
                this.points[pos.id].getGeometry().setCoordinates(this.getPosition(pos.longitude, pos.latitude))
            }
        })

        const overlay = new ol.Overlay({
            element: document.getElementById('popup-container'),
            positioning: 'bottom-center',
            offset: [0, -10]
        })
        this.overlay = overlay
        this.map.addOverlay(overlay)

        this.map.on('click', e => {
            overlay.setPosition()
            const features = this.map.getFeaturesAtPixel(e.pixel)
            if (features && features.length) {
                const coords = features[0].getGeometry().getCoordinates()
                const content = features.map(p => {
                    const looker = find(this.props.lookers, l => l.id === p.N.name)
                    if (!looker) {
                        return ''
                    }
                    return `<span class='looker-tooltip pointer' id='${looker.id}'>${looker.email}</span>`
                }).join('<br/>')
                overlay.getElement().innerHTML = content
                const lookerTooltips = document.getElementsByClassName('looker-tooltip')
                for(let i = 0; i< lookerTooltips.length; i++) {
                    lookerTooltips.item(i).onclick = () => this.props.onSelectLooker(lookerTooltips.item(i).id)
                }
                overlay.setPosition(coords)
            } else {
                this.props.onSelectLooker(null)
            }
            if (this.path && this.pathFeature) {
                this.path.getSource().removeFeature(this.pathFeature)
                this.path = undefined
                this.pathFeature = undefined
            }
        })

        
    }

    getToken() {
        return localStorage.getItem(LOOKATION_TOKEN)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.positions !== this.props.positions && this.props.positions.length) {
            this.createPositions()
        }
        if (prevProps.lookerPositions.length !== this.props.lookerPositions.length) {
            if (this.props.lookerPositions.length) {
                if (this.path && this.pathFeature) {
                    this.path.getSource().removeFeature(this.pathFeature)
                }
                
                const points = this.props.lookerPositions.map((p, i) => {
                    const position = this.getPosition(p.longitude, p.latitude)
                    return this.getPosition(p.longitude, p.latitude)
                })
        
                const featureLine = new ol.Feature({
                    geometry: new ol.geom.LineString(points)
                })

                this.pathFeature = featureLine
        
                const vectorLine = new ol.source.Vector({})
                vectorLine.addFeature(featureLine)
        
                const vectorLineLayer = new ol.layer.Vector({
                    source: vectorLine,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({ color: '#0f3055', weight: 4 }),
                        stroke: new ol.style.Stroke({ color: '#0f3055', width: 2 })
                    })
                })
        
                this.map.addLayer(vectorLineLayer)
                this.path = vectorLineLayer
            } else if (this.path && this.pathFeature) {
                this.path.getSource().removeFeature(this.pathFeature)
                this.path = undefined
                this.pathFeature = undefined
            }
        }
    }

    createPositions() {
        this.props.positions.map(p => {
            this.map.addLayer(this.getSimpleLayer(p.id, p.longitude, p.latitude))
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
    positions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition)),
    lookerPositions: PropTypes.arrayOf(PropTypes.instanceOf(DtoPosition)),
    lookers: PropTypes.arrayOf(PropTypes.instanceOf(LookerListDto)),
    onSelectLooker: PropTypes.func
}
  
const mapStateToProps = (store) => {
    return {
        lookerPositions: store.DashboardReducer.lookerPositions,
        positions: store.DashboardReducer.positions,
        lookers: store.LookerReducer.lookers
    }
}

export default connect(mapStateToProps)(Map)