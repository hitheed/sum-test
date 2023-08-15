const fakePromise = (res: any, delay: number) => {
  return new Promise<number>((resolve: any) => {
    setTimeout(() => resolve({
      success: true,
      data: res
    }), delay);
  });
}

export class LocalStorageService {
  async getData(name: string): Promise<unknown> {
    try {
      const result: any = await fakePromise(
        JSON.parse(localStorage.getItem(name) || '{}'),
        1000
      );

      return result.data;
    } catch (error: any) {
      console.error('Get data error in LocalStorageService: ', new Error(error));
    }
  }
  async setData(name: string, data: any): Promise<unknown> {
    try {
      localStorage.setItem(name, JSON.stringify(data));
      return await fakePromise(
        JSON.parse(localStorage.getItem(name) || '{}'),
        1000
      );
    } catch (error: any) {
      console.error('Set data error in LocalStorageService: ', new Error(error));
    }
  }
  async deleteData(name: string): Promise<unknown> {
    return localStorage.removeItem(name);
  }
}
