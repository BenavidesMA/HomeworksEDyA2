import { Injectable, signal } from '@angular/core';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  WhereFilterOp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export type FirestoreFilter = [string, WhereFilterOp, any];

@Injectable()
export class FirestoreService<T extends { id?: string } = DocumentData> {
  private collectionName!: string;

  readonly results = signal<T[]>([]);
  readonly isPending = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  init(name: string): this {
    this.collectionName = name;
    return this;
  }

  async getAll(filters: FirestoreFilter[] = []): Promise<T[]> {
    this.isPending.set(true);
    this.error.set(null);

    try {
      let q = query(collection(db, this.collectionName));

      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value));
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as T[];

      this.results.set(docs);
      this.isPending.set(false);
      return docs;
    } catch (err: any) {
      this.error.set(err.message ?? 'Error desconocido');
      this.isPending.set(false);
      return [];
    }
  }

  async add(data: Omit<T, 'id'>) {
    this.isPending.set(true);
    this.error.set(null);

    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });
      this.isPending.set(false);
      return docRef;
    } catch (err: any) {
      this.error.set(err.message ?? 'Error al crear documento');
      this.isPending.set(false);
      throw err;
    }
  }

  async update(id: string, data: Partial<T>) {
    this.isPending.set(true);
    this.error.set(null);

    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      this.isPending.set(false);
    } catch (err: any) {
      this.error.set(err.message ?? 'Error al actualizar documento');
      this.isPending.set(false);
      throw err;
    }
  }

  async remove(id: string) {
    this.isPending.set(true);
    this.error.set(null);

    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      this.isPending.set(false);
    } catch (err: any) {
      this.error.set(err.message ?? 'Error al eliminar documento');
      this.isPending.set(false);
      throw err;
    }
  }
}