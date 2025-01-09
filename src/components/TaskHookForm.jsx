import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    submitFn({ ...data, status: 'yapılacak' });
    toast.success('Yeni görev oluşturuldu.');
    reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          {...register('title', {
            required: 'Task başlığı yazmalısınız',
            minLength: {
              value: 3,
              message: 'Task başlığı en az 3 karakter olmalı',
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          id="description"
          {...register('description', {
            required: 'Task açıklaması yazmalısınız',
            minLength: {
              value: 10,
              message: 'Task açıklaması en az 10 karakter olmalı',
            },
          })}
        />
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((kisi) => (
            <label className="input-checkbox" key={kisi}>
              <input
                type="checkbox"
                value={kisi}
                {...register('people', {
                  validate: {
                    atLeastOne: (value) =>
                      value.length >= 1 || 'Lütfen en az bir kişi seçin',
                    atMostThree: (value) =>
                      value.length <= 3 || 'En fazla 3 kişi seçebilirsiniz',
                  },
                })}
              />

              {errors.people?.atLeastOne && (
                <p className="input-error">
                  {errors.people.atLeastOne.message}
                </p>
              )}

              {errors.people?.atMostThree && (
                <p className="input-error">
                  {errors.people.atMostThree.message}
                </p>
              )}

              {kisi}
            </label>
          ))}
          {errors.people && (
            <p className="input-error">{errors.people.message}</p>
          )}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
