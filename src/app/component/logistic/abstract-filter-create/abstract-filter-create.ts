import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Filter } from '../../../model/logistic/cargo/filter';
import { PERMANENT_TYPE } from '../../../enum/logistic/permanent-type';
import { MapsAPILoader } from '@agm/core';
import 'leaflet.pm';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Promise} from "q";
import {FilterService} from "../../../service/logistic/cargo/filter.service";
import {AbstractLogisticFilterEntityStore} from "../../../service/logistic/AbstractLogisticFilterEntityStore";
import {LogisticFilterEntityInterface} from "../../../model/logistic/logistic-filter-entity-interface";

declare var turf, L, LGeo, window;


export abstract class AbstractFilterCreateComponent<T extends LogisticFilterEntityInterface>

    implements OnInit {

    isLinear = true;
    arrivalFormGroup: FormGroup;
    departureFormGroup: FormGroup;
    extraOptionsFormGroup: FormGroup;

    date_now: Date;
    departure_geometry: any;
    departure_geometry_layer: any;
    arrival_geometry: any;
    arrival_geometry_layer: any;
    map: any;

    protected _permanent_type: number[] = PERMANENT_TYPE;

    constructor(
        public dialogRef: MatDialogRef<any>,
        protected __mapsAPILoader: MapsAPILoader,
        protected _formBuilder: FormBuilder
    ) {
    }

    public abstract get filter(): T;


    public abstract get filterService(): AbstractLogisticFilterEntityStore<T>;

    ngOnInit() {

        this.date_now = new Date();
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
        this.filter.arrival_geometry = this._getGeometryFromJson(this.getGeometry(this.arrival_geometry_layer));
        this.filter.departure_geometry = this._getGeometryFromJson(this.getGeometry(this.departure_geometry_layer));

        const promise  = this.filterService
            .create(this.filter)
            .then(filter => { this.dialogRef.close(filter); console.log('CREATED !', filter); })
            .catch(error => { console.log(error); });
    }

    isCreateBtnShowed() {
        return false;
    }

    protected getGeometry(layer){
        if(!layer) {
            return null;
        }

        return layer.toGeoJSON();
    }

    protected _getGeometryFromJson(data) {
        const features = data['features'];
        if(!features.length) {
            return null;
        }

        return features[0];
    }

    protected _createEditableMap(elementId: string, geoData: any): Promise<any> {

        return Promise((onResolve, onReject) => {
            this.__mapsAPILoader.load().then(() => {
                const map = L.map(elementId).setView([1, 1], 2);
                const editableLayers = new L.FeatureGroup();

                if(geoData) {
                    let layer = L.geoJson(geoData);
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
        let unoinLayer = newLayer.toGeoJSON();
        for (let i = 0; i < layers.length; ++i) {
            const tmpLayer = layers[i];
            const tmpLayerJson = tmpLayer.toGeoJSON();

            if(tmpLayerJson.geometry.type == 'Point') {
                layer.removeLayer(tmpLayer);
                continue;
            }

            try {
                unoinLayer = turf.union(unoinLayer, tmpLayerJson);
            } catch (e) {
                console.log(e);
            }
            layer.removeLayer(tmpLayer);
        }

        const currentlayers = L.geoJson(unoinLayer).getLayers();

        for (let i = 0; i < currentlayers.length; i++) {
            const tmpLayer = currentlayers[i];
            layer.addLayer(tmpLayer);
        }
    }


    debug(e) {
        console.log(e);
    }
}
