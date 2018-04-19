import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IGolfCourse} from "../interfaces/IGolfCourse";

@Injectable()
export class GolfCourseService {
  url: string = 'https://golf-courses-api.herokuapp.com/courses';

  constructor(private httpClient: HttpClient) {

  }
  getGolfCourses(): Observable<IGolfCourse[]>{
    return this.httpClient.post<IGolfCourse[]>(`${this.url}`, {
      latitude: 40.4426,
      longitude: -111.8631,
      radius: 100});
  }

  getCourseInfo(courseId): Observable<IGolfCourse> {
    console.log(courseId);
    console.log(this.httpClient.get<IGolfCourse>(`${this.url}/${courseId}`));
    return this.httpClient.get<IGolfCourse>(`${this.url}/${courseId}`);
  }



}
