import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {ANY, PERMANENT_TYPE} from '../../../enum/logistic/permanent-type';
import { MapsAPILoader } from '@agm/core';
import 'leaflet.pm';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Promise} from 'q';
import {AbstractLogisticFilterEntityStore} from '../../../service/logistic/AbstractLogisticFilterEntityStore';
import {LogisticFilterEntityInterface} from '../../../model/logistic/logistic-filter-entity-interface';

declare var turf, L, LGeo, window;


export abstract class AbstractFilterCreateComponent<T extends LogisticFilterEntityInterface>
    implements OnInit {

    isLinear = true;
    arrivalFormGroup: FormGroup;
    departureFormGroup: FormGroup;
    extraOptionsFormGroup: FormGroup;

    date_now: Date;
    date_max: Date;
    departure_geometry: any;
    departure_geometry_layer: any;
    arrival_geometry: any;
    arrival_geometry_layer: any;
    map: any;

    protected _permanent_type: number[];

    constructor(
        public dialogRef: MatDialogRef<any>,
        protected __mapsAPILoader: MapsAPILoader,
        protected _formBuilder: FormBuilder
    ) {
        this._permanent_type = PERMANENT_TYPE;
    }

    public abstract get filter(): T;

    public abstract get filterService(): AbstractLogisticFilterEntityStore<T>;

    ngOnInit() {
        this.date_now = new Date();
        this.date_max = new Date( Date.now() + 86400 * 365 );
        this.arrivalFormGroup = this._formBuilder.group({});
        this.departureFormGroup = this._formBuilder.group({});
        this.extraOptionsFormGroup = this._formBuilder.group({});

        this._createEditableMap('filter_form_map_departure', this.filter.departure_geometry)
            .then(layer => this.departure_geometry_layer = layer);
        this._createEditableMap('filter_form_map_arrival', this.filter.arrival_geometry)
            .then(layer => this.arrival_geometry_layer = layer);
    }

    cancelCreation(evt: Event): void {
        evt.preventDefault();

        this.dialogRef.close(null);
    }

    isDateFieldsDisabled(): boolean {
        return this.filter.permanent_status === 1;
    }

    onSubmit() {
        const action = this.filter.id ? 'update' : 'create';
        this.filter.arrival_geometry = this._getGeometryFromJson(this.getGeometry(this.arrival_geometry_layer));
        this.filter.departure_geometry = this._getGeometryFromJson(this.getGeometry(this.departure_geometry_layer));

        const promise  = this.filterService
            [action](this.filter)
            .then(filter => { this.dialogRef.close(filter); })
            .catch(error => { console.log(error); });
    }

    protected _comparePermanentStatus(f1: any, f2: any): boolean {
        return (f1 && f2 && f1.value === f2.value) || (!f2 && f1 === ANY);
    }

    protected getGeometry(layer) {
        if (!layer) {
            return null;
        }

        return layer.toGeoJSON();
    }

    protected _getGeometryFromJson(data) {
        const features = data['features'];
        if (!features.length) {
            return null;
        }

        return features[0];
    }

    protected _createEditableMap(elementId: string, geoData: any): Promise<any> {

        return Promise((onResolve, onReject) => {
            this.__mapsAPILoader.load().then(() => {
                const map = L.map(elementId).setView([1, 1], 2);
                const editableLayers = new L.FeatureGroup();

                if (geoData) {
                    const layer = L.geoJson(geoData);
                    editableLayers.addLayer(layer);
                    map.fitBounds(layer.getBounds());
                }

                const options = {
                    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
                    drawMarker: false,
                    drawPolyline: false,
                    drawRectangle: true,
                    drawPolygon: true,
                    drawCircle: true,
                    cutPolygon: true,
                    editMode: false,
                    removalMode: true,
                };


                L.gridLayer.googleMutant({
                    type: 'roadmap',
                }).addTo(map);

                map.setMinZoom(2);
                map.setMaxZoom(10);
                map.addLayer(editableLayers);
                map.pm.addControls(options);
                map.on('pm:create', (e) => {
                    let tmp = e.layer;

                    editableLayers.addLayer(tmp);
                    tmp.removeFrom(map);

                    if (tmp instanceof L.Circle) {
                        tmp = new LGeo.circle(tmp.toGeoJSON().geometry.coordinates.reverse(), tmp.getRadius());
                    }

                    this._union(editableLayers, tmp);
                });

                onResolve(editableLayers);
            });
        });
    }

    protected _union(layer, newLayer) {
        const layers = layer.getLayers();
        let unionLayer = newLayer.toGeoJSON();
        for (let i = 0; i < layers.length; ++i) {
            const tmpLayer = layers[i];
            let tmpLayerJson = tmpLayer.toGeoJSON();
            let tmpUnionLayer = null;
            let needRemoveLayer = null;

            if (tmpLayerJson.type === 'FeatureCollection') {
                tmpLayerJson = tmpLayerJson.features[0];
            }

            if (tmpLayerJson.geometry.type === 'Point') {
                layer.removeLayer(tmpLayer);
                continue;
            }

            try {
                tmpUnionLayer = turf.union(unionLayer, tmpLayerJson);
                unionLayer = tmpUnionLayer;
                needRemoveLayer = tmpLayer;
            } catch (e) {
                console.log(e);
                needRemoveLayer = unionLayer;
                if (unionLayer.length > 0) {
                    unionLayer = unionLayer[0];
                }
            }

            layer.removeLayer(needRemoveLayer);
        }

        const currentlayers = L.geoJson(unionLayer).getLayers();

        for (let i = 0; i < currentlayers.length; i++) {
            const tmpLayer = currentlayers[i];
            layer.addLayer(tmpLayer);
        }
    }
}
