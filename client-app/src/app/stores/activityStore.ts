import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
   activities: Activity[] = [];
   activityRegistry = new Map<string, Activity>();
   selectedActivity: Activity | undefined = undefined;
   editMode = false;
   loading = false;
   loadingInitial = false;

   constructor() {
      makeAutoObservable(this);
   }
   get activitiesByDate() {
      return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date));
   }
   get groupedActivities() {
      return Object.entries(
         this.activitiesByDate.reduce((activities, activity) => {
            const date = activity.date;
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
         }, {} as {[key: string]: Activity[]})
      );
   }

   loadActivities = async () => {
      this.loadingInitial = true;
      try {
         const activities = await agent.Activities.list();

         activities.forEach(activity => {
            this.setActivityDate(activity);
         });
         this.setLoadingInitial(false);

      } catch (ex) {
         console.log(ex);
         this.setLoadingInitial(false);
      }
   }

   loadActivity = async(id: string) => {
      let activity = this.getActivity(id);
      if (activity) {
         this.selectedActivity = activity;
         return activity;
      } else {
         this.loadingInitial = true;
         try {
            activity = await agent.Activities.details(id);
            this.setActivityDate(activity);
            runInAction(() => this.selectedActivity = activity);
            this.setLoadingInitial(false);
            return activity;
         } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
         }
      }
   }

   private setActivityDate = (activity: Activity) => {
      activity.date = activity.date.split('T')[0];
      this.activityRegistry.set(activity.id, activity);
   }

   private getActivity = (id: string) => {
      return this.activityRegistry.get(id);
   }

   setLoadingInitial = (state: boolean) => {
      this.loadingInitial = state;
   }
   createActivity = async (activity: Activity) => {
      this.loading = true;
      try {
         await agent.Activities.create(activity);
         runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
         })
      } catch (error) {
         runInAction(() => {
            this.editMode = false;
            this.loading = false;
         })
      }
   }
   updateActivity = async (activity: Activity) => {
      this.loading = true;
      try {
         await agent.Activities.update(activity);
         runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
             this.selectedActivity = activity;
             this.editMode = false;
             this.loading = false;
         })
      } catch (error) {
         runInAction(() => {
            this.editMode = false;
            this.loading = false;
         })
      }
   }
   deleteActivity = async (id: string) => {
      this.loading = true;
      try {
         await agent.Activities.delete(id);
         runInAction(() => {
            this.activityRegistry.delete(id);
            
            this.loading = false;
         })
      } catch (error) {
         console.log(error);
         runInAction(() => this.loading = false)
      }
   }
}